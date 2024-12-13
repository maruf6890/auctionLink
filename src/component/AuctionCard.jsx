import React, { useContext, useState } from "react";
import CountdownTimer from "./CountdownTimer";
import { Link } from "react-router";
import { IoCreateOutline } from "react-icons/io5";

import {
  MdOutlineKeyboardDoubleArrowDown,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";
import { format } from "date-fns";
import databaseService from "../Apprwite/database";
import conf from "../config/conf";
import AuthContext from "../Apprwite/AuthProvider";



export default function AuctionCard({ auction }) {
  const {user}=useContext(AuthContext);
  const [isExpanded, setIsExpanded] = useState(false);

  // Helper to check if a deadline is over
  const isDeadlineOver = (deadlineDate) => {
    const now = new Date();
    const deadline = new Date(deadlineDate);
    return now.getTime() > deadline.getTime();
  };

  // Toggle collapse content
  const handleToggle = () => {
    setIsExpanded((prevState) => !prevState);
  };

  // Format dates for display
  const teamAuctionTime = format(new Date(auction.team_auction_date), "MMMM dd, yyyy");
  const playerAuctionTime = format(new Date(auction.player_auction_date), "MMMM dd, yyyy");

  //
  const managerData={
    auction_id: auction.$id,
    name:user.name,
    email:user.email,
    phone: (user.phone)? user.phone: "0000000000",
  }
  console.log(managerData);
  const handleTeamRequest = async()=>{
      try {
        
        const createdTeam = await databaseService.createDocument(
          conf.appwriteManagerId, 
          managerData
        );
        console.log("Team Request Successful");
        alert("We Receved your response !");
        
      } catch (error) {
        console.error("Error creating team:", error);
        setError("Failed to create team. Please try again.");
      } 
  
  
  }
  return (
    <div className="my-10 p-5 shadow-md bg-white border rounded-sm">
      {/* Auction Header */}
      <div className="auction-head  justify-between flex mb-5">
        <div className="">
        <h4 className="text-3xl font-semibold text-gray-800">{auction.auction_name}</h4>
        <p className="text-sm font-regular">by - {auction.host_organization}</p>
        </div>
        <div className="">
      
      <Link
        className="btn tooltip flex items-center  btn-sm"
        data-tip="Create Team"
        to={`/auction/${auction.$id}/create_team`}
      >
        Team <IoCreateOutline className="inline" />
      </Link>
  
         </div>

      </div>

      {/* Auction Image */}
      <div className="auction-image border mb-5">
        <img
          src={auction.cover_url}
          alt={auction.auction_name}
          className="w-full h-96 object-cover rounded"
        />
      </div>

      {/* Auction Details */}
      <div className="auction-body">
        <div className="bg-base-200 collapse-open ">
          {/* Title and Toggle */}
          <div
            className="collapse-title text-xl font-medium cursor-pointer flex items-center"
            onClick={handleToggle}
          >
            {isExpanded ? "Show Less" : "Show More"}
            {!isExpanded ? <MdOutlineKeyboardDoubleArrowDown /> : <MdKeyboardDoubleArrowUp />}
          </div>

          {/* Collapse Content */}
          {isExpanded && (
            <div className="transition collapse-content">
              <p>{auction.auction_detail}</p>
              {/* Registration Deadline */}
              <p className="my-5">Player Registration Deadline: {auction.registation_dedline}</p>
              {!isDeadlineOver(auction.registation_dedline) ? (
                <>
                  <button
                    onClick={handleTeamRequest}
                    className="btn text-white theme-btn bg-gradient-to-r from-cyan-500 to-blue-500 rounded-md text-lg uppercase"
                  >
                    Team Request
                  </button>
                  <Link
                    to={`/auction/${auction.$id}/player_application`}
                    className="btn ml-5 text-white theme-btn bg-gradient-to-r from-cyan-500 to-blue-500 rounded-md text-lg uppercase"
                  >
                    Player Registration
                  </Link>
                </>
              ) : (
                <p>Registration is over</p>
              )}

              {/* Team Auction */}
              <p className="my-5">Team Auction Date: {teamAuctionTime}</p>
              {!isDeadlineOver(auction.team_auction_date) ? (
                <CountdownTimer deadlineDate={auction.team_auction_date} />
              ) : (
                <Link
                  to={`/auction/${auction.$id}/auction_screen`}
                  className="btn text-white theme-btn bg-gradient-to-r from-cyan-500 to-blue-500 rounded-md text-lg uppercase"
                >
                  Team Auction
                </Link>
              )}

              {/* Player Auction */}
              <p className="my-5">Player Auction Date: {playerAuctionTime}</p>
              {!isDeadlineOver(auction.player_auction_date) ? (
                <CountdownTimer deadlineDate={auction.player_auction_date} />
              ) : (
                <Link
                  to={`/auction/${auction.auction_id}/player_auction_screen`}
                  className="btn text-white theme-btn bg-gradient-to-r from-cyan-500 to-blue-500 rounded-md text-lg uppercase"
                >
                  Player Auction
                </Link>
              )}

              {/* Total Teams */}
              <div className="mt-5">
                <h5 className="text-lg font-bold">Total Teams:</h5>
                <p className="text-gray-700">{auction.total_team}</p>
              </div>

              {/* Auction Status */}
              <div className="mt-5">
                <h5 className="text-lg font-bold">Auction Status:</h5>
                <ul className="steps steps-vertical lg:steps-horizontal ml-5">
                  <li className={auction.application_done ? "step step-primary" : "step"}>
                    Application
                  </li>
                  <li className={auction.team_bidding_done ? "step step-primary" : "step"}>
                    Team Bidding
                  </li>
                  <li className={auction.player_bidding_done ? "step step-primary" : "step"}>
                    Player Bidding
                  </li>
                  <li className={auction.closed ? "step step-primary" : "step"}>Closed</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
