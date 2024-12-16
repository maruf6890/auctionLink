import React, { useContext } from 'react'
import authService from '../Apprwite/aurh'
import { Link } from 'react-router';
import AuthContext from '../Apprwite/AuthProvider';
import { MdSportsBasketball } from "react-icons/md";
export default function Header() {
    const {user}= useContext(AuthContext);
   
    return (
        <div className='container mx-auto max-w-screen-xl px-2'>
            <div className="navbar ">
                <div className="navbar-start">
                    <div className="dropdown block md:hidden">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h7" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li><a>Homepage</a></li>
                            <li><a>Portfolio</a></li>
                            <li><a>About</a></li>
                        </ul>
                    </div>
                    <a  id="text-[#141B41]" className=" pl-0  text-3xl ">Auction<span className=' bg-red p-1 border-2 border-slate-500 text-md rounded-sm ml-2'>Link</span></a>
                </div>
                <div className="navbar-center">
                    <label className="input input-bordered flex items-center gap-2">
                        <input type="text" className="grow" placeholder="Search" />
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="h-4 w-4 opacity-70">
                            <path
                                fillRule="evenodd"
                                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                clipRule="evenodd" />
                        </svg>
                    </label>
                   
                </div>
               
                    <div className="navbar-end hidden md:block ">
                       
                        <ul className='menu menu-horizontal  flex justify-end'>
                        {
                            (!user)? <> 
                            <li><Link to="/login">Sign In</Link></li>                          
                            <li><Link to="/registration">Sign Up</Link></li>
                            </>:
                            <p>@{user.name}</p>
                        }
                        </ul>
                    </div>
                
                
            </div>

        </div>
    )
}
