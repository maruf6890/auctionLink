import React, { useContext, useEffect, useState } from "react";
import Header from "./component/Header";
import { Link, useNavigate, useParams } from "react-router";
import databaseService from "./Apprwite/database";
import conf from "./config/conf";
import Swal from 'sweetalert2';
import AuthContext from "./Apprwite/AuthProvider";
import { TbLivePhotoFilled } from "react-icons/tb";
import CountdownTimer from "./component/CountdownTimer";

import { FaAnglesLeft,FaAnglesRight } from "react-icons/fa6";
export default function SidebarLess() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const params = useParams();
 

  const team_id = params.team_id;
  const auction_id = params.auction_id;
  const index = parseInt(params.index);


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
      } catch (error) {
        console.error("Error fetching auction data:", error.message);
      } finally {
        setLoadingAuction(false);
      }
    };
    fetchAuction();
  }, [auction_id]);

  // Update deadline for the first team
  useEffect(() => {
    if (auctionData && auctionData.current_team_index === 0) {
      const updateDeadline = async () => {
        try {
          const firstElementDeadline = auctionData.team_auction_date;
          const firstDeadline = new Date(firstElementDeadline);
          firstDeadline.setMinutes(firstDeadline.getMinutes() + 2);
          const obj = { ending_time: firstDeadline.toISOString() };

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
      };
      updateDeadline();
    }
  }, [auctionData, team_id]);

  const calculateRemainingTime = (ending_time) => {
    if (!ending_time) return 0;
    const deadline = new Date(ending_time);
    const now = new Date();
    return Math.max(Math.floor((deadline - now) / 1000), 0);
  };

  // Handle bidding
  const handleBid = async (e) => {
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
        confirmButtonText: "Yes, Bid for it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Bidding Done!",
            icon: "success",
          });

          const bidderQueue = [...current_team.bidder_queue];
          const timeQueue = [...current_team.time_queue];
          const priceQueue = [...current_team.price_queue];

          bidderQueue.unshift(user.name);
          timeQueue.unshift(new Date().toISOString());
          priceQueue.unshift(price);

          const obj = {
            current_price: price,
            manager_name: user.name,
            manager_id: user.$id,
            bidder_queue: bidderQueue,
            price_queue: priceQueue,
            time_queue: timeQueue,
            ending_time: new Date(current_team.ending_time).toISOString(),
          };

          try {
            const updatedTeam = await databaseService.updateDocument(
              conf.appwriteTeamId,
              team_id,
              obj
            );
            setCurrentTeam(updatedTeam);
          } catch (error) {
            console.error("Error updating bid:", error.message);
          }
        }
      });
    } else {
      Swal.fire({
        title: "Hey, upscale your bid!",
        icon: "warning",
      });
    }
  };


  
  if (loadingTeam || loadingAuction) {
    return <div>Loading...</div>;
  }


  
  const auctionEndingTime= new Date(auctionData?.team_auction_date);
  auctionEndingTime.setMinutes(auctionEndingTime.getMinutes()+2*(index+1));
  const auctionEndingTimeIso= auctionEndingTime.toISOString();
  
  if(calculateRemainingTime(auctionEndingTimeIso)===0){
    if(current_team?.manager_name){
      //update team and update manager 
      teamObj={
        is_sold:true,
      }
      const updateTeam= async()=>{
        const team= await databaseService.updateDocument(appwriteTeamId,current_team,teamObj);
        setCurrentTeam(team);
      }
      updateTeam();
      //member update
      managerObj={
        is_sold:true,
      }
      const updateManager= async()=>{
        const manager= await databaseService.updateDocument(appwriteTeamId,current_team.manager_id,managerObj);
      }
      updateManager();
    }else{
      teamObj={
        isUnsold:true,
      }
      const updateTeam= async()=>{
        const team= await databaseService.updateDocument(appwriteTeamId,current_team,teamObj);
        setCurrentTeam(team);
      }
      updateTeam();


    }
  }

  return (
    <div>
      <div className="header-warp fixed top-0 left-0 w-full bg-white text-gray z-50 shadow-md backdrop-blur-sm">
        <Header />
      </div>
      <div className="mt-20 container w-full md:w-8/12 mx-auto bg-white text-gray shadow-md">
  <section className="grid md:grid-cols-2 gap-5 p-5">
    {/* Team Image Section */}
    <div className="flex justify-center items-center">
      <img
        className="auction-image w-9/12 rounded-md shadow-md border p-5 h-auto hover:border-red-500 hover:scale-105 hover:shadow-lg transition-transform duration-500 ease-in-out"
        src={current_team?.logo_image || "/placeholder.jpg"}
        alt={current_team?.team_name || "Team Logo"}
      />
    </div>

    {/* Auction Data Section */}
    <div className="auction-data">
      {/* Team Name */}
      <h3 className="inter font-bold text-[#141B41] text-3xl">
        {current_team?.team_name || "Team Name"}
      </h3>
      {/* Auction Name */}
      <p className="text-gray-600 inter text-sm">
        {auctionData?.auction_name || "Auction Name"}
      </p>

      {/* Price Information */}
      <div className="price my-5">
        <button className="btn btn-sm bg-yellow-300">
          Base Price | {current_team?.min_price || "N/A"} Points
        </button>
        <button className="btn btn-sm bg-yellow-300 mx-5">
          Current Price | {current_team?.current_price || "N/A"} Points
        </button>
      </div>

      <hr />

      {/* Auction Countdown and Bid Form */}
      <div className="auction-header my-5 flex flex-col md:flex-row gap-5">
        <div>
          <p className="text-sm text-gray-500 inter mb-2">Auction Ending In</p>
          <CountdownTimer deadlineDate={auctionEndingTimeIso}></CountdownTimer>
        </div>
        <div>
          <form
            onSubmit={handleBid}
            className="flex items-center gap-3 mt-6"
          >
            <input
              name="price"
              className="input w-24 input-bordered"
              type="number"
              min={current_team?.current_price + 1 || 0}
              placeholder="Enter Bid"
              required
              aria-label="Enter your bid"
            />
            <button
              disabled={(current_team?.is_sold ?? true) || (current_team?.isUnsold ?? true)}
              type="submit"
              className="btn bg-[#306BAC] hover:bg-[#3d85d2] text-gray-200"
            >
              Place A Bid
            </button>
          </form>
        </div>
      </div>

      <hr />

      {/* Last Bid Information */}
      <div className="my-5">
        <p className="text-sm text-gray-500 inter mb-2">Last Bid</p>
        <p className="text-xs text-gray-500 inter">
          {current_team?.manager_name || "No Bids Yet"} at{" "}
          {current_team?.time_queue?.[0]
            ? new Date(current_team.time_queue[0]).toLocaleString()
            : "N/A"}
        </p>
      </div>

      {/* Previous and Next Buttons */}
      
      <div className="flex justify-end gap-5 mt-5">
      <Link className="btn btn-sm btn-neutral btn-outline"
  to={`/auction/${auction_id}/team_auction_screen/${auctionData?.team_queue_id[(index - 1 + auctionData?.team_queue_id.length) % auctionData?.team_queue_id.length]}/${(index - 1 + auctionData?.team_queue_id.length) % auctionData?.team_queue_id.length}`}>

    <FaAnglesLeft></FaAnglesLeft>
</Link>

<Link
  className="btn btn-sm btn-neutral btn-outline"
  to={`/auction/${auction_id}/team_auction_screen/${auctionData?.team_queue_id[(index + 1) % auctionData?.team_queue_id.length]}/${(index + 1) % auctionData?.team_queue_id.length}`}>
 <FaAnglesRight></FaAnglesRight>
</Link>
       </div>
    </div>
  </section>
</div>

      <div className="container p-10 my-10 w-8/12 mx-auto bg-white text-gray shadow-md">
        <h3 className="uppercase inter semibold text-sm btn"><TbLivePhotoFilled className="inline text-red-500"></TbLivePhotoFilled> LIVE Auctions</h3>
        <table className="table table-bordered table-striped my-5">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Bidder Name</th>
              <th>Bidding Time</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {current_team && current_team.bidder_queue.length > 0 ? (
              current_team.bidder_queue.map((bidder, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{bidder || "Unknown Bidder"}</td>
                  <td>
                    {current_team.time_queue[index]
                      ? new Date(current_team.time_queue[index]).toLocaleString()
                      : "N/A"}
                  </td>
                  <td>{current_team.price_queue[index]?.toLocaleString("en-US", { style: "currency", currency: "USD" }) || "N/A"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  No bids have been placed yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>


      </div>
    </div>
  );
}
