import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import databaseService from "./Apprwite/database";
import conf from "./config/conf";

import { HiSpeakerphone } from "react-icons/hi";
import { FaLink } from "react-icons/fa6";
import { TbListDetails } from "react-icons/tb";
import AuthContext from "./Apprwite/AuthProvider";
import { Query } from "appwrite";

export default function AuctionDetails() {
  const { auction_id } = useParams();
  const [auctionData, setAuctionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [playerAuctionQueue, setPlayerAuctionQueue] = useState([]);
  const { user } = useContext(AuthContext);

  // Fetch auction details
  useEffect(() => {
    const fetchAuction = async () => {
      try {
        setLoading(true);
        const data = await databaseService.getDocument(conf.appwriteAuctionId, auction_id);
        setAuctionData(data);
      } catch (err) {
        console.error("Failed to fetch auction details:", err);
        setError("Failed to load auction details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAuction();
  }, [auction_id]);

  // Fetch player queue
  useEffect(() => {
    if (!auctionData || !auctionData.$id) return;

    const fetchPlayerQueue = async () => {
      try {
        const queries = [Query.equal("auction_id", auctionData.$id)];
        const data = await databaseService.getDocuments(conf.appwritePlayerId, queries);
        setPlayerAuctionQueue(data);
      } catch (error) {
        console.error("Failed to fetch team auction queue:", error);
      }
    };

    fetchPlayerQueue();
  }, [auctionData]);

  // Update auction queue
  useEffect(() => {
    if (!auctionData || playerAuctionQueue.length === 0) return;

    const updateQueue = async () => {
      const playerQueueIds = playerAuctionQueue.map((item) => item.$id);
      const updateData = {
        player_queue_id: playerQueueIds,
        total_player: playerQueueIds.length,
      };

      try {
        await databaseService.updateDocument(
          conf.appwriteAuctionId,
          auctionData.$id,
          updateData
        );
        console.log("Auction queue successfully updated.");
      } catch (error) {
        console.error("Failed to update auction queue:", error.message);
      }
    };

    updateQueue();
  }, [playerAuctionQueue]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!auctionData) return <p>No auction data found.</p>;
  const managerData={
    auction_id: auctionData.$id,
    name:user.name,
    email:user.email,
    phone: (user.phone)? user.phone: "0000000000",
  }

 
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
    <div className="mt-16 bg-slate-50 p-10">
      <div className="">
        <div
          className="relative flex items-center justify-center py-16 bg-blue-950 border mb-5"
          style={{
            backgroundImage: `url(${auctionData.cover_url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur"></div>
          <img
            src={auctionData.cover_url}
            alt={auctionData.auction_name}
            className="relative w-8/12 h-auto object-cover rounded"
          />
        </div>
      </div>
      <h1 className="text-4xl font-bold text-[#141B41] inter">
        {auctionData.auction_name}
      </h1>
      <p>
        Organized by <b>IICT SUST</b>, this event will take place on{" "}
        <b>December 25, 2024</b>, at <b>Sylhet, Bangladesh.</b>
      </p>
      <hr className="my-5 border border-blue-200" />
      <p className="my-5 text-xl">
        <strong className="">
          <TbListDetails className="inline text-blue-500"></TbListDetails> More
          About Auctions:
        </strong>
        <br /> 
      </p>
      <p className="inter space-x-1 text-justify">{auctionData.auction_detail}</p>
      <p className="my-5 text-xl">
        <strong>
          <HiSpeakerphone className="inline text-blue-700"></HiSpeakerphone>{" "}
          Alert:
        </strong>{" "}
        {auctionData.description}
      </p>
      <div className="overflow-hidden">
        <table className="table border text-center">
          <thead>
            <tr className="bg-gray-300">
              <th></th>
              <th>Event</th>
              <th>Deadline</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>1</th>
              <td>Registration</td>
              <td>
                {new Date(auctionData.registation_dedline).toLocaleString()}
              </td>
            </tr>
            <tr>
              <th>2</th>
              <td>Team Auction Date</td>
              <td>
                {new Date(auctionData.team_auction_date).toLocaleString()}
              </td>
            </tr>
            <tr>
              <th>3</th>
              <td>Player Auction Date</td>
              <td>
                {new Date(auctionData.player_auction_date).toLocaleString()}
              </td>
            </tr>
          </tbody>
        </table>
       </div>
       <hr className="my-3" />
        <p className="my-5 text-xl">
          <strong >
            <FaLink className="inline text-blue-700"></FaLink> Links:
          </strong>
        </p>
        <Link to={`/auction/${auctionData.$id}/player_registration`} className="theme-button">
          Player Registration
        </Link>
        <a onClick={handleTeamRequest} className="theme-button ml-5">Request For Team</a>
      
    </div>
  );
}
