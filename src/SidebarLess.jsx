import React, { useContext, useEffect, useState } from "react";
import Header from "./component/Header";
import { useNavigate, useParams } from "react-router";
import databaseService from "./Apprwite/database";
import conf from "./config/conf";
import SecondTimer from "./component/SecondTimer";
import { use } from "react";
import Swal from 'sweetalert2';
import AuthContext from "./Apprwite/AuthProvider";
import { TbLivePhotoFilled } from "react-icons/tb";



export default function SidebarLess() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const params = useParams();

  const team_id = params.team_id;
  const auction_id = params.auction_id;

  const [current_team, setCurrentTeam] = useState(null);
  const [auctionData, setAuctionData] = useState(null);
  const [loadingTeam, setLoadingTeam] = useState(true);
  const [loadingAuction, setLoadingAuction] = useState(true);

  // Fetch current team data
  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const teamData = await databaseService.getDocument(
          conf.appwriteTeamId,
          team_id
        );
        setCurrentTeam(teamData);
      } catch (error) {
        console.error("Error fetching team data:", error.message);
      } finally {
        setLoadingTeam(false);
      }
    };
    fetchTeam();
  }, [team_id]);

  // Fetch auction data
  useEffect(() => {
    const fetchAuction = async () => {
      try {
        const auctionData = await databaseService.getDocument(
          conf.appwriteAuctionId,
          auction_id
        );
        setAuctionData(auctionData);
        console.log("console auction", auctionData.current_team_index);

      } catch (error) {
        console.error("Error fetching auction data:", error.message);
      } finally {
        setLoadingAuction(false);
      }
    };
    fetchAuction();
  }, [auction_id]);

  
  

  /* Redirect if team is sold or unsold
  useEffect(() => {
    if (current_team && (current_team.isUnsold || current_team.is_sold)) {
      navigate("/");
    }
  }, [current_team, navigate]);
*/
  // Update deadline for the first team
  useEffect(() => {
    const updateDeadline = async () => {
      if (auctionData && auctionData.current_team_index === 0) {
        const firstElementDeadline = auctionData.team_auction_date;
        const firstDeadline = new Date(firstElementDeadline);
        firstDeadline.setMinutes(firstDeadline.getMinutes() + 2);
        const firstDeadlineIso = firstDeadline.toISOString();

        const obj = { ending_time: firstDeadlineIso };

        try {
          const updatedData = await databaseService.updateDocument(
            conf.appwriteTeamId,
            team_id,
            obj
          );
          setCurrentTeam(updatedData);
          console.log("Deadline updated:", updatedData);
        } catch (error) {
          console.error("Error updating deadline:", error.message);
        }
      }
    };
    updateDeadline();
  }, [auctionData, team_id]);
  
  // Calculate remaining time for the timer

  const calculateRemainingTime = () => {
    if (!current_team?.ending_time) return 0;
    const deadline = new Date(current_team.ending_time);

    const now = new Date();

    const duration = Math.max(Math.floor((deadline - now) / 1000), 0);

    
    return duration;
  };

  //bidding system
  const handleBid = (e) => {
    e.preventDefault();
    const priceStr = e.target.price.value;
    const price = parseInt(priceStr, 10);

    if (current_team.min_price < price && price > current_team.current_price) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Bid for it!"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Bidding Done!",
            icon: "success"
          });
          //update current price 
          //update manager 
          //update manager id
          //update bid list 
          //update bid Price 
          const bidderQueue = [...current_team.bidder_queue];
          bidderQueue.unshift(user.name);
          const timeQueue = [...current_team.time_queue];
          const timeNow = new Date();
          const timeNowIso = timeNow.toISOString();
          timeQueue.unshift(timeNowIso);

          const priceQueue = [...current_team.price_queue];
          priceQueue.unshift(price);

          const updatedEndingTime = current_team.ending_time;
          const stampUpdatedTime = new Date(updatedEndingTime);
          stampUpdatedTime.setMinutes(stampUpdatedTime.getMinutes() + 1);
          const updatedIsoEndingTime = stampUpdatedTime.toDateString();

          const obj = {
            current_price: price,
            manager_name: user.name,
            manager_id: user.$id,
            bidder_queue: bidderQueue,
            price_queue: priceQueue,
            time_queue: timeQueue,
            ending_time: updatedIsoEndingTime,
          }

          const updateTeamData = async () => {
            const updatedTeam = await databaseService.updateDocument(conf.appwriteTeamId, team_id, obj);
            setCurrentTeam(updatedTeam);
          }
          updateTeamData();
          //update-timer


        }
      });
    } else {
      Swal.fire({
        title: "Hey Upscale your bid!",
        icon: "warning"
      });
    }

  }
 console.log(auctionData, "auction");


  //next auction or auction over system
  if (auctionData && calculateRemainingTime === 0) {
    //define sold /unsold
    if (current_team?.current_price > current_team?.min_price) {
      
    } else {
     
    }
    //end or next auction
    if (auctionData.current_team_index < auctionData.total_team - 1) {
      //update current_team_index
      const object = {
        current_team_index: 1,
      }
      const updateTeamIndex = async () => {
        const updateAuction = await databaseService.updateDocument(conf.appwriteAuctionId, auction_id, object);
        setAuctionData(updateAuction);
      }
      updateTeamIndex()
      //redirect to next
      navigate(
        `/auction/${auction_id}/team_auction_screen/${auctionData.team_acction_queue[
        auctionData.current_team_index == null ? 0 : auctionData.current_team_index
        ]}`
      );

    } else {
      //close team auction
      const object = {
        team_bidding_done: true
      }
      const updateTeamIndex = async () => {
        const updateAuction = await databaseService.updateDocument(conf.appwriteAuctionId, auction_id, object);
        setAuctionData(updateAuction);
      }
      updateTeamIndex();
      navigate('/');

    }


  }

  if (loadingTeam || loadingAuction) {
    return <div>Loading...</div>;
  }
  //reverse some array

  return (
    <div>
      <div className="header-warp fixed top-0 left-0 w-full bg-white text-gray z-50 shadow-md backdrop-blur-sm">
        <Header />
      </div>
      <div className="mt-20 container w-8/12 mx-auto bg-white text-gray shadow-md">
        <section className="grid md:grid-cols-2 gap-5">
          <div className="p-5 flex justify-center items-center">
            <img
              className="auction-image w-9/12  rounded-md shadow-md border p-5 h-auto hover:border-red-500 hover:scale-105 hover:shadow-lg transition-transform duration-500 ease-in-out"
              src={current_team.logo_image}
              alt={current_team.team_name}
            />
          </div>
          <div className="auction-data p-5 px-0">
            <h3 className="inter font-bold text-[#141B41] text-3xl">
              {current_team.team_name}
            </h3>
            <p className="text-gray-600 inter text-sm">
              {auctionData.auction_name}
            </p>
            <div className="price my-5">
              <button className="btn btn-sm bg-yellow-300">
                Base Price | {current_team.min_price} Points
              </button>
              <button className="btn btn-sm bg-yellow-300 mx-5">
                Current Price | {current_team.current_price} Points
              </button>
            </div>

            <hr />
            <div className="auction-header my-5 flex gap-5">
              <div>
                <p className="text-sm text-gray-500 inter mb-2">
                  Auction Ending In
                </p>
                {calculateRemainingTime()}
                <SecondTimer duration={calculateRemainingTime} />
              </div>
              <div>

                
                <div className="join mt-6 mx-8">

                  <form onSubmit={handleBid}>
                    <input
                      name="price" className="input w-24 input-bordered join-item"
                      type="number"
                    />
                    <button name="submit" className="btn join-item uppercase focus:shadow-none focus:border-0 bg-[#306BAC] hover:bg-[#3d85d2] text-gray-200">
                      Place A Bid
                    </button>
                  </form>
                </div>
              </div>
            </div>
          <hr />
          <div className="my-5">
          <p className="text-sm text-gray-500 inter mb-2">
                  Last bid
                </p>
                <p className="text-xs text-gray-500 inter  mb-2">
                  {current_team.manager_name} at {current_team.time_queue[0]}
                  
                </p>
          </div>

          </div>
        </section>

      </div>
      <div className="container p-10 my-10 w-8/12 mx-auto bg-white text-gray shadow-md">
        <h3 className="uppercase inter semibold text-sm btn"><TbLivePhotoFilled className="inline text-red-500"></TbLivePhotoFilled> LIVE Auctions</h3>
        <table className="table border my-5">
          <tr>
              <th>x</th>
              <th>Bidder Name</th>
              <th>Bidding Time</th>
              <th>Price</th>
          </tr>
          {
            current_team.bidder_queue.map((bidder, index) => (
              <tr key={index} className="border">
                <td>{index+1}</td>
                <td>{bidder}</td>
                <td>{current_team.time_queue[index]}</td>
                <td>{current_team.price_queue[index]}</td>
              </tr>
            ))
          }

        </table>

      </div>
    </div>
  );
}
