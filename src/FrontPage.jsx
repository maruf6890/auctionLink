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
        <div className="text-2xl font-bold "> <a id="text-[#141B41]" className=" pl-0  text-3xl ">Auction<span className=' bg-red p-1 border-2 border-slate-500 text-md rounded-sm ml-2'>Link</span></a></div>
        <nav className="flex space-x-4">
        {user ? (
        <>
          {/* User Avatar */}
          <img
            src={user.avatar || "https://via.placeholder.com/40"}
            alt="User Avatar"
            className="w-10 h-10 rounded-full border border-gray-400"
          />
          {/* Logout Button */}
          <button onClick={handleLogout} className="uppercase px-5 py-2 hover:border-b  border-gray-400 bg-transparent text-gray-400 focus:outline focus:outline-gray-400 transition duration-300">
            Logout
          </button>
        </>
      ) : (
        <>
          {/* Login and Sign Up Buttons */}
          <Link to="/login" className="uppercase px-5 py-2 hover:border-b border-gray-400 bg-transparent text-gray-400 focus:outline focus:outline-gray-400 transition duration-300">
            Login
          </Link>
          <Link  to="/registration" className="uppercase px-5 py-2 hover:border-b border-gray-400 bg-transparent text-gray-400 focus:outline focus:outline-gray-400 transition duration-300">
            Sign Up
          </Link>
        </>
      )}
        </nav>
      </header>

      {/* Main Section */}
      <main className="relative flex-grow flex bg-gradient-to-r from-slate-900 via-gray-800 to-black h-96 flex-col justify-center home-hero items-center text-center px-20 overflow-hidden">
  {/* Bluish overlay with blur effect */}
  <div className="absolute inset-0  bg-blue-950 opacity-10 blur-3xl  pointer-events-none"></div>

  <div className="relative  grid grid-cols-2">
    <div className="text-left flex items-center">
      <div className='text-gray-200 inter bg-[#1e3d7c38] p-10  shadow-md'>
        <h1 className="text-4xl sm:text-5xl text-sh font-bold drop-shadow-lg  mb-4">
          Manage Your Auctions Seamlessly
        </h1>
        <p className="text-lg mb-8 max-w-lg drop-shadow-lg">
          Host, manage, and bid in auctions with ease using AuctionLink. A platform built for efficiency and speed.
        </p>
        <div className="space-x-4 flex">
  {/* Start Auction Button */}
  <button
    onClick={handleCreateAuctuin}
    className="btn bg-slate-400 capitalize px-8 py-2 text-lg text-white rounded-lg hover:bg-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-300"
  >
    Start an Auction
  </button>

  {/* Join Auction Form */}
  <form onSubmit={handleJoinAuction} className="flex items-center w-72 mx-auto space-x-1">
    {/* Input Field */}
    <div className="relative w-64">
      <input
        type="text"
        name='key'
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 placeholder-gray-500 focus:outline-none"
        placeholder="Enter auction code"
        required
      />
    </div>

    {/* Join Button */}
    <button
      type="submit"
      className="inline-flex  items-center py-3 px-4 text-sm font-medium text-white bg-slate-400 rounded-md border border-slate-400 hover:bg-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-300"
    >
      Join
    </button>
  </form>
</div>

      </div>
    </div>
    <div className='flex justify-end'>
      <img className=' w-8/12' src="hero.png" alt="Neon Player" />
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
