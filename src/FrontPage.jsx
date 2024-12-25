import React, { useContext } from 'react'
import './App.css';
import AuthContext from './Apprwite/AuthProvider';
import authService from './Apprwite/aurh';
import { Link, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
export default function FrontPage() {
  
  const {user}= useContext(AuthContext);

  const handleLogout= ()=>{
    authService.logout();
    console.log("end");
  }
  const navigate= useNavigate();
  const handleCreateAuctuin=()=>{
    if(!user){
      Swal.fire({
        icon: "warning",
        title: "Please Login to continue",
        draggable: true,
      });
    }else{
      navigate("/create_auction");
    }
  }

  const handleJoinAuction = (e)=>{
    e.preventDefault();
    const key= e.target.key.value;
    navigate(`/auction/${key}`);
    
  }
  return (
    <div className="flex flex-col h-screen">
      {/* Header Section */}
      <header className="flex text-gray-400 bg-[#141B41] justify-between items-center p-4 shadow-md">
        <div className=" text-lg md:text-2xl font-bold "> <Link id="text-[#141B41]" className=" pl-0  md:text-3xl ">Auction<span className=' bg-red p-1 border-2 border-slate-500 text-md rounded-sm ml-2'>Link</span></Link></div>
        <nav className="flex space-x-4 text-xs md:text-xl">
        {user ? (
        <>
          {/* User Avatar */}
          <img
            src={user.avatar || "https://via.placeholder.com/40"}
            alt="User Avatar"
            className="w-10 h-10 rounded-full border border-gray-400"
          />
          {/* Logout Button */}
          <button onClick={handleLogout} className="uppercase md:px-5 py-2 hover:border-b  border-gray-400 bg-transparent text-gray-400 focus:outline focus:outline-gray-400 transition duration-300">
            Logout
          </button>
        </>
      ) : (
        <>
          {/* Login and Sign Up Buttons */}
          <Link to="/login" className="uppercase md:px-5 py-2 hover:border-b border-gray-400 bg-transparent text-gray-400 focus:outline focus:outline-gray-400 transition duration-300">
            Login
          </Link>
          <Link  to="/registration" className="uppercase md:px-5 py-2 hover:border-b border-gray-400 bg-transparent text-gray-400 focus:outline focus:outline-gray-400 transition duration-300">
            Sign Up
          </Link>
        </>
      )}
        </nav>
      </header>

      <main className="relative flex-grow flex bg-gradient-to-r from-slate-900 via-gray-800 to-black   md:h-auto flex-col justify-center home-hero items-center text-center px-4 md:px-20 overflow-hidden">
  {/* Bluish overlay with blur effect */}
  <div className="absolute inset-0 bg-blue-950 opacity-10 blur-3xl pointer-events-none"></div>

  <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8">
    {/* Left Section */}
    <div className="text-left flex items-center">
      <div className="text-gray-200 inter overflow-hidden w-full bg-[#1e3d7c38] p-4 md:p-10 shadow-md">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl md:text-center font-bold drop-shadow-lg mb-4 md:mb-6">
          Manage Your Auctions Seamlessly
        </h1>
        <p className="text-sm md:text-base lg:text-lg mb-6 text-justify md:mb-8 max-w-lg drop-shadow-lg">
          Host, manage, and bid in auctions with ease using AuctionLink. A platform built for efficiency and speed.
        </p>
        <div className="space-x-0 md:space-x-4 flex flex-col md:flex-row items-center">
          {/* Start Auction Button */}
          <button
            onClick={handleCreateAuctuin}
            className="btn bg-slate-400 capitalize px-6 py-3 md:px-8 md:py-3 text-sm md:text-base lg:text-lg text-white rounded-lg hover:bg-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-300 w-full lg:w-auto"
          >
            Start an Auction
          </button>

          {/* Join Auction Form */}
          <form
            onSubmit={handleJoinAuction}
            className="flex items-center mt-4 md:mt-0 w-full lg:w-auto space-x-2"
          >
            {/* Input Field */}
            <div className="relative w-full lg:w-64">
              <input
                type="text"
                name="key"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 placeholder-gray-500 focus:outline-none"
                placeholder="Enter auction code"
                required
              />
            </div>

            {/* Join Button */}
            <button
              type="submit"
              className="inline-flex items-center py-3 px-4 text-sm font-medium text-white bg-slate-400 rounded-md border border-slate-400 hover:bg-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-300"
            >
              Join
            </button>
          </form>
        </div>
      </div>
    </div>

    {/* Right Section (Image) */}
    <div className="hidden md:flex justify-center md:justify-end">
      <img
        className="w-10/12 lg:w-8/12"
        src="hero.png"
        alt="Neon Player"
      />
    </div>
  </div>
</main>


      {/* Footer Section */}
      <footer className="text-center bg-[#141B41] p-4 text-gray-500">
        &copy; {new Date().getFullYear()} AuctionLink. All rights reserved .
      </footer>
    </div>
  )
}
