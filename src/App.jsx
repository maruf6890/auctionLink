import { useEffect, useContext } from 'react';
import './App.css';

import Header from './component/Header';
import { Link, Outlet, useNavigate } from 'react-router';
import AuthContext from './Apprwite/AuthProvider';
import { MdEmojiEvents } from "react-icons/md";
import { GiNewspaper } from "react-icons/gi";
import { LuTvMinimalPlay } from "react-icons/lu";
import { IoIosHome } from "react-icons/io";
import { MdMiscellaneousServices } from "react-icons/md";
import { BsInfoSquare } from "react-icons/bs";
import { IoIosMail } from "react-icons/io";
import Footer from './component/Footer';
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
              <li>
                <Link to="/create_auction">
                  <MdEmojiEvents /> Create An Auction
                </Link>
              </li>

              <hr className="my-5 border-1 border-[#141b41]" />

              <li>
                <Link to="/">
                  <IoIosHome></IoIosHome> Home
                </Link>
              </li>
              
              <li>
                <Link to="/sports_news">
                  <GiNewspaper /> Sports News
                </Link>
              </li>

              <li>
                <Link to="/sports_videos">
                <LuTvMinimalPlay /> Sports Videos
                </Link>
              </li>
              <li>
                <Link to="/contact">
                  <IoIosMail></IoIosMail> Contact
                </Link>
              </li>
              <li>
                <Link to="/services">
                  <MdMiscellaneousServices></MdMiscellaneousServices> Services
                </Link>
              </li>
              <li>
                <Link to="/about_us">
                  <BsInfoSquare></BsInfoSquare> About Us
                </Link>
              </li>
            
            <hr className='my-5 border-1  border-[#141b41]' />
            {user && <li><a onClick={handleLogout}>Sign Out</a></li>}
          </ul>
        </div>
      </div>
    </div >
      <Footer></Footer>
    </>
  );
}

export default App;
