import React, { useContext, useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router';
import AuthContext from '../Apprwite/AuthProvider';
import Footer from './Footer';


export default function Community() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const qu = e.target.search.value;
    navigate(`/community/search/${qu}`);
    location.reload();
  };
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetch('/sports-category.json')
      .then(res => res.json())
      .then(res => setCategories(res));
  }, []);
  
  const handleCategoryChange =(e)=>{
    const cat= e.target.value;
    navigate(`/community/category/${cat}`);
    location.reload();

  }
  
  return (
    <div className="bg-slate-200 h-full">
      {/* Header */}
      <header className="flex text-gray-400 bg-[#141B41] justify-between items-center p-4 shadow-md">
        <div className="text-2xl font-bold">
          <Link to="/" className="text-3xl">
            Auction<span className="bg-red p-1 border-2 border-slate-500 text-md rounded-sm ml-2">Link</span>
          </Link>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="join">
          <div>
            <input name="search" className="input input-bordered join-item" placeholder="Search" />
          </div>
          <div className="indicator">
            <button type="submit" className="btn join-item">
              Search
            </button>
          </div>
        </form>

        {/* Navigation */}
        <nav className="flex space-x-4">
          {user ? (
            <>
              <img
                src={user.avatar || 'https://via.placeholder.com/40'}
                alt="User Avatar"
                className="w-10 h-10 rounded-full border border-gray-400"
              />
              <button className="uppercase px-5 py-2 hover:border-b border-gray-400 bg-transparent text-gray-400 focus:outline focus:outline-gray-400 transition duration-300">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="uppercase px-5 py-2 hover:border-b border-gray-400 bg-transparent text-gray-400 focus:outline focus:outline-gray-400 transition duration-300"
              >
                Login
              </Link>
              <Link
                to="/registration"
                className="uppercase px-5 py-2 hover:border-b border-gray-400 bg-transparent text-gray-400 focus:outline focus:outline-gray-400 transition duration-300"
              >
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </header>

      <div>
        {/* Sidebar */}
      <aside className="w-60 h-screen absolute">
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Find By Category</h2>
          <form>
            {categories.map((category, index) => (
              <div key={index} className="flex items-center mb-3">
                <input
                  type="radio"
                  id={category.key}
                  name="category" 
                  onChange={handleCategoryChange}
                  value={category.key}
                  className="form-radio h-5 w-5 text-[#141B41] focus:ring-[#141B41]"
                />
                <label
                  htmlFor={category.key}
                  className="ml-3 text-gray-700 text-sm font-medium"
                >
                  {category.name}
                </label>
              </div>
            ))}
          </form>
        </div>

      </aside>

      {/* Main Content */}
      <div className="section ml-64 max-w-4xl mx-auto">
        <Outlet />
      </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
