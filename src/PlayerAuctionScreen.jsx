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
export default function PlayerAuctionScreen() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const params = useParams();
 

  const player_id = params.player_id;
  const auction_id = params.auction_id;
  const index = parseInt(params.index);
  console.log("current player id",params);

  const [current_player, setCurrentPlayer] = useState(null);
  const [auctionData, setAuctionData] = useState(null);
  const [loadingPlayer, setLoadingPlayer] = useState(true);
  const [loadingAuction, setLoadingAuction] = useState(true);

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



  const calculateRemainingTime = (ending_time) => {
    if (!ending_time) return 0;
    const deadline = new Date(ending_time);
    const now = new Date();
    return Math.max(Math.floor((deadline - now) / 1000), 0);
  };


  if (loadingPlayer || loadingAuction) {
    return <div>Loading...</div>;
  }

  console.log(current_player,"My current Player")
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


  
 

  
  const auctionEndingTime= new Date(auctionData?.player_auction_date);
  auctionEndingTime.setMinutes(auctionEndingTime.getMinutes()+2*(index+1));
  const auctionEndingTimeIso= auctionEndingTime.toISOString();
  
  if(calculateRemainingTime(auctionEndingTimeIso)===0){
    if(current_player?.manager_name){
      //update team and update manager 
      playerObj={
        isSold:true,
      }
      const updatePlayer= async()=>{
        const player= await databaseService.updateDocument(databaseService.appwritePlayerId,player_id,playerObj);
        setCurrentPlayer(player);
      }
      updatePlayer();
      /*member update
      managerObj={
        is_sold:true,
      }
      const updateManager= async()=>{
        const manager= await databaseService.updateDocument(appwriteTeamId,current_player.manager_id,managerObj);
      }
      updateManager(); */
    }else{
      playerObj={
        isUnSold:true,
      }
      const updatePlayer= async()=>{
        const player= await databaseService.updateDocument(appwritePlayerId,current_player,playerObj);
        setCurrentPlayer(player);
      }
      updatePlayer();


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
        src={current_player?.photo_url|| "/placeholder.jpg"}
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
  <div className="mt-4 space-y-2">
    <p className="text-lg">
      <span className="font-bold">Age:</span> {current_player?.age || "N/A"}
    </p>
    <p className="text-lg">
      <span className="font-bold">Position:</span> {current_player?.position || "N/A"}
    </p>
    <p className="text-lg">
      <span className="font-bold">Category:</span> Gold
    </p>
  </div>

      <hr />
{/* Price Information */}
      <div className="price my-5">
        <button className="btn btn-sm bg-yellow-300">
          Base Price | {current_player?.min_price || "N/A"} Points
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
              className="input w-24 input-bordered"
              type="number"
              min={current_player?.current_price + 1 || 0}
              placeholder="Enter Bid"
              required
              aria-label="Enter your bid"
            />
            <button
              disabled={(current_player?.isSold ?? true) || (current_player?.isUnSold ?? true)}
              type="submit"
              className="btn bg-[#306BAC] hover:bg-[#3d85d2] text-gray-200"
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
            {current_player && current_player.bid_queue.length > 0 ? (
              current_player.bid_queue.map((bidder, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{bidder || "Unknown Bidder"}</td>
                  <td>
                    {current_player.time_queue[index]
                      ? new Date(current_player.time_queue[index]).toLocaleString()
                      : "N/A"}
                  </td>
                  <td>{current_player.price_queue[index]?.toLocaleString("en-US", { style: "currency", currency: "USD" }) || "N/A"}</td>
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
