import React, { useContext, useEffect, useState } from "react";
import Header from "./component/Header";
import { Link, useNavigate, useParams } from "react-router";
import databaseService from "./Apprwite/database";
import conf from "./config/conf";
import Swal from 'sweetalert2';
import AuthContext from "./Apprwite/AuthProvider";
import { TbLivePhotoFilled } from "react-icons/tb";
import CountdownTimer from "./component/CountdownTimer";

import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
import { Query } from "appwrite";
export default function PlayerAuctionScreen() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const params = useParams();


  const player_id = params.player_id;
  const auction_id = params.auction_id;
  const index = parseInt(params.index);
  console.log("current player id", params);

  const [current_player, setCurrentPlayer] = useState(null);
  
  const [auctionData, setAuctionData] = useState(null);
  const [currenManager,setCurrentManager]= useState(null);
  const [userTeam,setUserTeam]= useState(null);
  const [loadingPlayer, setLoadingPlayer] = useState(true);
  const [loadingAuction, setLoadingAuction] = useState(true);


  // Fetch current manager
  useEffect(() => {
    const fetch= async () => {
      try {
        const Data = await databaseService.getDocuments(
          conf.appwriteManagerId, [Query.equal("email",user?.email),Query.equal("auction_id",auction_id)]
        );
        setCurrentManager(Data);
      } catch (error) {
        console.error("Error fetching manager data:", error.message);
      } finally {
        setLoadingPlayer(false);
      }
    };
    fetch();
  }, [user.email]);


  useEffect(() => {
  const fetch = async () => {
    if (!currenManager?.[0]?.team_id) return;

    try {
      setLoadingPlayer(true); 
      const Data = await databaseService.getDocument(conf.appwriteTeamId, currenManager[0].team_id);
      setUserTeam(Data);
    } catch (error) {
      setLoadingPlayer(true);
      console.error("Error fetching team data:", error.message);
    } finally {
      setLoadingPlayer(false); 
    }
  };

  fetch();
}, [currenManager]);


  // Fetch current player data
  useEffect(() => {
    const fetchPlayer = async () => {
      try {
        const playerData = await databaseService.getDocument(
          conf.appwritePlayerId,
          player_id
        );
        setCurrentPlayer(playerData);
      } catch (error) {
        console.error("Error fetching player data:", error.message);
      } finally {
        setLoadingPlayer(false);
      }
    };
    fetchPlayer();
  }, [player_id]);

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



  const calculateRemainingTime = (ending_time) => {
    if (!ending_time) return 0;
    const deadline = new Date(ending_time);
    const now = new Date();
    return Math.max(Math.floor((deadline - now) / 1000), 0);
  };


  if (loadingPlayer || loadingAuction) {
    return <div>Loading...</div>;
  }

 
  // Handle bidding
  const handleBid = async (e) => {
    e.preventDefault();
    const priceStr = e.target.price.value;
    const price = parseInt(priceStr, 10);

    if (current_player.base_price < price && price > current_player.current_price) {
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

          const bidderQueue = [...current_player.bid_queue];
          const timeQueue = [...current_player.time_queue];
          const priceQueue = [...current_player.price_queue];

          bidderQueue.unshift(user.name);
          timeQueue.unshift(new Date().toISOString());
          priceQueue.unshift(price);

          const obj = {
            current_price: price,
            manager_name: user.name,
            manager_id: user.$id,
            bid_queue: bidderQueue,
            price_queue: priceQueue,
            time_queue: timeQueue,
          };

          try {
            const updatedPlayer = await databaseService.updateDocument(
              conf.appwritePlayerId,
              player_id,
              obj
            );
            setCurrentPlayer(updatedPlayer);
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






  const auctionEndingTime = new Date(auctionData?.player_auction_date);
  auctionEndingTime.setMinutes(auctionEndingTime.getMinutes() + 2 * (index + 1));
  const auctionEndingTimeIso = auctionEndingTime.toISOString();
  
 
  if (calculateRemainingTime(auctionEndingTimeIso)===0 && (current_player?.isSold==false && current_player?.isUnSold==false)) {
    console.log("working with me");
    
    const updatePlayer = async (playerId, playerObj) => {
      try {
        const player = await databaseService.updateDocument(
          conf.appwritePlayerId, 
          playerId, 
          playerObj
        );
        setCurrentPlayer(player);
        console.log("Player updated successfully:", player);
      } catch (error) {
        console.error("Error updating player:", error);
      }
    };
  
    if (current_player?.manager_name) {
      
  
      const playerObj = {
        isSold: true,
        isUnSold: false,
      };
  
      updatePlayer(player_id, playerObj);
  
      // update team if player is sold y
      const playerList =[...userTeam?.players];
      playerList.push(current_player?.$id);
      const teamObj={
        players:playerList,
      }
      const managerUpdatedPoint= currenManager[0]?.my_point-current_player?.current_price;
      const update= async() => {
        try {
          setLoadingPlayer(true);

          //update team for auction
          const teamData=  await databaseService.updateDocument(conf.appwriteTeamId,userTeam?.$id,teamObj);
          console.log("player updated successful");
          setUserTeam(teamData);

          //update manager point after a bid
          const managerUpdate= await databaseService.updateDocument(conf.appwriteManagerId,current_player?.manager_id,{my_point:managerUpdatedPoint})
        } catch (error) {
          setLoadingPlayer(true);
          console.log("Error updateing the team, ",error );
        }finally{
          setLoadingPlayer(false);
        }
      }
      update();
    
      // reduce point of manager 


      
    } else {
      const playerObj = {
        isUnSold: true,
        isSold:false,
      };
  
      updatePlayer(player_id, playerObj);
    }
    
  }


  if(calculateRemainingTime(auctionData?.player_auction_date)>0){
   
    return (<>
    <div className="bg-slate-100 flex items-center justify-center w-full h-screen">
     
     <div>
     <h2>Player Auction Will Start in...</h2>
    <CountdownTimer deadlineDate={auctionData?.player_auction_date}></CountdownTimer>

     </div>
     </div>
    </>)
  }


  console.log("team: ",userTeam);
  return (
    <div>

      <div className="mt-20 bg-slate-100 mx-20 text-gray shadow-md">
        <section className="grid md:grid-cols-2 gap-5 p-5">
          {/* Team Image Section */}
          <div className="flex justify-center items-center">
            <img
              className="auction-image w-9/12 rounded-md shadow-md border p-5 h-auto hover:border-red-500 hover:scale-105 hover:shadow-lg transition-transform duration-500 ease-in-out"
              src={current_player?.photo_url || "/placeholder.jpg"}
              alt={current_player?.team_name || "player Logo"}
            />
          </div>

          {/* Auction Data Section */}
          <div className="auction-data">
            {/* Player Name */}
            <h3 className="font-inter font-bold text-[#141B41] text-3xl mb-2 ">
              {current_player?.name || "Team Name"}
            </h3>

            {/* Auction Name */}
            <p className="text-gray-600 font-inter text-sm">
              {auctionData?.auction_name || "Auction Name"}
            </p>


            {/* Player Details */}
            <div className="my-4 space-y-1 text-gray-600 inter">
              <p className="text-sm">
                <span className="font-bold">Age:</span> {current_player?.age || "N/A"}
              </p>
              <p className="text-sm">
                <span className="font-bold">Position:</span> {current_player?.position || "N/A"}
              </p>
              <p className="text-sm">
                <span className="font-bold">Category:</span> Gold
              </p>
            </div>

            <hr />
            {/* Price Information */}
            <div className="price my-5">
              <button className="btn btn-sm bg-yellow-300">
                Base Price | {current_player?.base_price || "N/A"} Points
              </button>
              <button className="btn btn-sm bg-yellow-300 mx-5">
                Current Price | {current_player?.current_price || "N/A"} Points
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
                <div className="flex  justify-center mt-6 items-center">
                  <form
                    onSubmit={handleBid}
                    className="flex items-center gap-3 mt-6"
                  >
                    <input
                      name="price"
                      className="theme-input"
                      type="number"
                      min={current_player?.current_price + 1 || 0}
                      placeholder="Enter Bid"
                      required
                      aria-label="Enter your bid"
                    />
                    <button
                      disabled={(current_player?.isSold ?? true) || (current_player?.isUnSold ?? true)}
                      type="submit"
                      className="theme-button"
                    >
                      Place A Bid
                    </button>
                  </form>
                </div>
              </div>
            </div>

            <hr />

            {/* Last Bid Information */}
            <div className="my-5">
              <p className="text-sm text-gray-500 inter mb-2">Last Bid</p>
              <p className="text-xs text-gray-500 inter">
                {current_player?.manager_name || "No Bids Yet"} at{" "}
                {current_player?.time_queue?.[0]
                  ? new Date(current_player.time_queue[0]).toLocaleString()
                  : "N/A"}
              </p>
            </div>

            {/* Previous and Next Buttons */}

            <div className="flex justify-end gap-5 mt-5">
              <Link className="btn btn-sm btn-neutral btn-outline"
                to={`/auction/${auction_id}/player_auction_screen/${auctionData?.player_queue_id[(index - 1 + auctionData?.player_queue_id.length) % auctionData?.player_queue_id.length]}/${(index - 1 + auctionData?.player_queue_id.length) % auctionData?.player_queue_id.length}`}>

                <FaAnglesLeft></FaAnglesLeft>
              </Link>

              <Link
                className="btn btn-sm btn-neutral btn-outline"
                to={`/auction/${auction_id}/player_auction_screen/${auctionData?.player_queue_id[(index + 1) % auctionData?.player_queue_id.length]}/${(index + 1) % auctionData?.player_queue_id.length}`}>
                <FaAnglesRight></FaAnglesRight>
              </Link>
            </div>
          </div>
        </section>
      </div>

      <div className="container p-6 my-10 mx-auto bg-slate-100 text-gray shadow-md rounded-md max-w-full lg:max-w-6xl">
        <h3 className="uppercase inter semibold text-sm flex items-center gap-2">
          <TbLivePhotoFilled className="text-red-500" /> LIVE Auctions
        </h3>
        <div className="overflow-x-auto mt-5">
          <table className="table-auto w-full text-left border-collapse">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Bidder Name</th>
                <th className="px-4 py-2">Bidding Time</th>
                <th className="px-4 py-2">Price</th>
              </tr>
            </thead>
            <tbody>
              {current_player && current_player.bid_queue.length > 0 ? (
                current_player.bid_queue.map((bidder, index) => (
                  <tr key={index} className="border-b hover:bg-gray-100">
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{bidder || "Unknown Bidder"}</td>
                    <td className="px-4 py-2">
                      {current_player.time_queue[index]
                        ? new Date(current_player.time_queue[index]).toLocaleString()
                        : "N/A"}
                    </td>
                    <td className="px-4 py-2">
                      {current_player.price_queue[index]?.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      }) || "N/A"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-4 py-2 text-center text-gray-500">
                    No bids have been placed yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
