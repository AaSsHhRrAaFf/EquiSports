import React from "react";
import logo from '../../assets/logo.png'; 
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a>Home</a>
            </li>
            
            <li>
              <a>All Sports Equipment</a>
            </li>
          </ul>
        </div>
        <img src={logo} alt="Logo" className="w-16 rounded-2xl" />
        <a className="btn btn-ghost text-3xl font-bold">Sports Hub</a>
        {/* <Link><img src="./src/assets/logo.png"></img></Link> */}
        
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a>Home</a>
          </li>
          
          <li>
            <a>All Sports Equipment</a>
          </li>
        </ul>
      </div>
      <div className="navbar-end gap-4">
        <a className="btn">Login</a>
        <a className="btn">Registration</a>
      </div>
      
    </div>
  );
}

export default Navbar;
