import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";  

const Navbar = () => {
 
  const { user }  = useSelector((state) => state.auth);
 
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white shadow-md">
      {/* Logo */}
      <Link to="/" className="text-xl font-bold tracking-wide">
        Collab Space
      </Link>

      <div className="flex">
        <input className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-white-500 text-gray-100 placeholder-gray-400" placeholder="Search..."/>
      </div>
      {/* Menu */}
      {user && 
      <div className="flex gap-6 text-sm font-medium">
        <Link to="/ideas" className="hover:text-gray-200">
          Ideas
        </Link>
        <Link to="/collaborate" className="hover:text-gray-200">
          Collaborate
        </Link>
        <Link to="/friends" className="hover:text-gray-200">
          Friends
        </Link>
        <Link to="/chat" className="hover:text-gray-200">
          Chat
        </Link>
      </div>  
      } 

      {/* Auth Buttons */}
      {user ? (
      <div className="flex gap-2">
        <p>{user.username}</p>
      </div>
      ) : ( 
        <div className="flex gap-3">
          <Link
            to="/login"
            className="px-4 py-2 rounded-lg bg-white text-indigo-600 font-medium hover:bg-gray-100"
          >
            Login / Register
          </Link> 
        </div>
      )}
    </nav>
  );
};

export default Navbar;
