import React, { useEffect, useState } from 'react';
import { GrMenu } from "react-icons/gr";
import { IoHome } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { FaUserTie } from "react-icons/fa6";
import { GiAmericanFootballPlayer, GiHoneyJar } from "react-icons/gi";
import { GiThorHammer } from "react-icons/gi";
import { TbHammer } from "react-icons/tb";
import { SlDocs } from "react-icons/sl";
import { MdSpaceDashboard } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import { HiUserGroup } from "react-icons/hi2";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { NavLink, Outlet, useParams } from 'react-router';
import databaseService from './Apprwite/database';
import conf from './config/conf';
import './app.css';
const Auction = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const {auction_id}= useParams();

  const [auctionData, setAuctionData] = useState(null); // For fetched auction data
  const [loading, setLoading] = useState(true); // For tracking loading state
  const [error, setError] = useState(null); // For error handling

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Start loading
        setError(null); // Clear previous errors
        const Data = await databaseService.getDocument(conf.appwriteAuctionId, auction_id);
        console.log("Successfully fetched auction data");
        setAuctionData(Data);
      } catch (error) {
        console.error("Error fetching auction data:", error);
        setError("Failed to fetch auction data.");
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchData();
  }, [auction_id]);

  if (loading) {
    return <p>Loading...</p>; // Show loading message
  }

  if (error) {
    return <p>{error}</p>; // Show error message
  }

  if (!auctionData) {
    return <p>No auction data available.</p>; // Handle case with no data
  }
  console.log("MY Auctioon", auctionData);
  return (
    <>
      {/* Header */}
      <div className="header-wrap bg-[#141B41] h-16   shadow-lg text-gray-500 fixed top-0 left-0 w-full z-50 ">
        <header className="  text-primary-content h-full  flex items-center justify-between px-4">
          <div className='flex'>
          <button className='text-2xl mr-3' onClick={() => setMenuOpen(!menuOpen)}><GrMenu></GrMenu></button>
          <div className="text-2xl font-medium "> <a id="text-[#141B41]" className=" pl-0  text-2xl ">Auction<span className=' bg-red p-1 border-2 border-slate-500 text-md rounded-sm ml-2'>Link</span></a></div>
          </div>
          
          <div className="">
         
           
          </div>
        </header>
      </div>

      {/* Main Layout */}
      <div className="flex h-screen  ">
        {/* Sidebar */}
        <div
          className={`fixed top-0 left-0 h-full bg-slate-200 transition-all duration-300 shadow-lg z-20${
            menuOpen ? 'w-64' : 'w-20'
          } flex flex-col`}
        >
          <nav className="flex-grow mt-4 pt-14 space-y-2  auction-menu">
            <NavLink to="/" className="flex items-center p-3 text-sm hover:bg-slate-300 hover:border-l-4 border-[#141B41] hover:border-l-4 border-[#141B41] transition-all">
              <span className="material-icons text-xl"><IoHome></IoHome></span>
              {menuOpen && <span className="ml-3">Home</span>}
            </NavLink>
            <NavLink to={`/auction/${auction_id}`} className="flex items-center p-3 text-sm hover:bg-slate-300 hover:border-l-4 border-[#141B41] hover:border-l-4 border-[#141B41] transition-all">
              <span className="material-icons text-xl"><MdSpaceDashboard></MdSpaceDashboard></span>
              {menuOpen && <span className="ml-3">Auction</span>}
            </NavLink>
            <NavLink to={`/auction/${auction_id}/update_auction`} className="flex items-center p-3 text-sm hover:bg-slate-300 hover:border-l-4 border-[#141B41] transition-all">
              <span className="material-icons text-xl"><FaEdit></FaEdit></span>
              {menuOpen && <span className="ml-3">Edit</span>}
            </NavLink>
            <NavLink to={`/auction/${auction_id}/create_team`} className="flex items-center p-3 text-sm hover:bg-slate-300 hover:border-l-4 border-[#141B41] transition-all">
              <span className="material-icons text-xl"><AiOutlineUsergroupAdd></AiOutlineUsergroupAdd></span>
              {menuOpen && <span className="ml-3">Add Team</span>}
            </NavLink>
           

            <NavLink  to={`/auction/${auction_id}/player_list`} className="flex items-center p-3 text-sm hover:bg-slate-300 hover:border-l-4 border-[#141B41] transition-all">
              <span className="material-icons text-xl"><GiAmericanFootballPlayer></GiAmericanFootballPlayer></span>
              {menuOpen && <span className="ml-3">Player</span>}
            </NavLink>
            <NavLink to={`/auction/${auction_id}/manager_list`}  className="flex items-center p-3 text-sm hover:bg-slate-300 hover:border-l-4 border-[#141B41] transition-all">
              <span className="material-icons text-xl"><FaUserTie></FaUserTie></span>
              {menuOpen && <span className="ml-3">Team Manager</span>}
            </NavLink>
            <NavLink to={`/auction/${auction_id}/player_auction_screen/${auctionData?.player_queue_id[0]}/0`} className="flex items-center p-3 text-sm hover:bg-slate-300 hover:border-l-4 border-[#141B41] transition-all">
              <span className="material-icons text-xl"><GiThorHammer></GiThorHammer></span>
              {menuOpen && <span className="ml-3">Player Auction</span>}
            </NavLink>
            <a href="#" className="flex items-center p-3 text-sm hover:bg-slate-300 hover:border-l-4 border-[#141B41] transition-all">
              <span className="material-icons text-xl"><SlDocs></SlDocs></span>
              {menuOpen && <span className="ml-3">Result</span>}
            </a>
          </nav>
          <div className="mt-auto mb-4 p-3">
            <a href="#" className="flex items-center text-sm hover:bg-slate-300 hover:border-l-4 border-[#141B41] p-2 rounded transition-all">
              <span className="material-icons text-xl"><MdLogout></MdLogout></span>
              {menuOpen && <span className="ml-3">Logout</span>}
            </a>
          </div>
        </div>

        {/* Main Content Area */}
        <div
          className={`flex flex-col flex-grow bg-base-100 ml-${menuOpen ? '64' : '20'} transition-all duration-300`}
        >
          {/* Main Section */}
          <main className="flex-grow p-4 overflow-auto">
            <div className="max-w-screen-xl mx-auto">
              <Outlet></Outlet>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Auction;
