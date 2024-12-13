import { useEffect, useContext } from 'react';
import './App.css';

import Header from './component/Header';
import { Outlet, useNavigate } from 'react-router';
import AuthContext from './Apprwite/AuthProvider';
import { MdEmojiEvents } from "react-icons/md";
import { GiNewspaper } from "react-icons/gi";
import { LuTvMinimalPlay } from "react-icons/lu";
function App() {
  const { user, logout } = useContext(AuthContext); // Access user data and logout function from context
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login'); 
  };


  return (
    <>
      <div className="header-warp fixed top-0 left-0 w-full bg-white text-gray z-50 shadow-md backdrop-blur-sm">
        <Header />
      </div>
      <div className="mt-14 container mx-auto max-w-screen-xl">
        <div className="drawer lg:drawer-open">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content bg-gray-100 pt-8">
            <Outlet />
            <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
              Open drawer
            </label>
          </div>
          <div className="drawer-side">
            <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
            <ul className="menu bg-[#98B9F2] inter uppercase bold text-semibold text-sm text-gary-700 min-h-full w-80 p-4">
              {/* Sidebar content here */}
              <li><a href="#item1"><MdEmojiEvents></MdEmojiEvents> Create An Auction</a></li>
             

              <hr className='my-5 border-1  border-[#141b41]' />
              <li><a href="#item1"><GiNewspaper></GiNewspaper> Sports News</a></li>
              <li><a href="#item1"><LuTvMinimalPlay></LuTvMinimalPlay> Sports Videos</a></li>

              <hr className='my-5 border-1  border-[#141b41]' />
              {user && <li><a onClick={handleLogout}>Sign Out</a></li>}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
