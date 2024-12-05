import React from "react";
import logo from '../../assets/logo.png'; 
import { Link } from "react-router-dom";

function Navbar() {
  const isLoggedIn = false; // Replace with actual authentication logic

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <button tabIndex={0} className="btn btn-ghost lg:hidden" aria-label="Toggle navigation menu">
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
          </button>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/all-equipment">All Sports Equipment</Link>
            </li>
          </ul>
        </div>
        <img src={logo} alt="Logo" className="w-16 rounded-2xl" />
        <Link to="/" className="btn btn-ghost text-3xl font-bold">Sports Hub</Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/all-equipment">All Sports Equipment</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end gap-4">
        {isLoggedIn ? (
          <button className="btn" onClick={() => {/* Add logout logic */}}>Log Out</button>
        ) : (
          <>
            <Link to="/login" className="btn">Login</Link>
            <Link to="/register" className="btn">Register</Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
