import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import logo from "../../assets/logo.png";
import { ThemeContext } from "../../contexts/ThemeContext";
import { Sun, Moon } from "lucide-react";

function Navbar() {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="navbar bg-base-100 shadow-md">
      <div className="navbar-start">
        <div className="dropdown">
          <button
            tabIndex={0}
            className="btn btn-ghost lg:hidden"
            aria-label="Toggle navigation menu"
          >
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
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/all-equipment">All Sports Equipment</Link>
            </li>
            {user && (
              <>
                <li>
                  <Link to="/add-equipment">Add Equipment</Link>
                </li>
                <li>
                  <Link to="/my-equipment">My Equipment List</Link>
                </li>
              </>
            )}
          </ul>
        </div>
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="w-12 h-12 rounded-full" />
          <span className="text-xl font-bold">Sports Hub</span>
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/all-equipment">All Sports Equipment</Link>
          </li>
          {user && (
            <>
              <li>
                <Link to="/add-equipment">Add Equipment</Link>
              </li>
              <li>
                <Link to="/my-equipment">My Equipment List</Link>
              </li>
            </>
          )}
        </ul>
      </div>

      <div className="navbar-end gap-2">
        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="btn btn-ghost btn-circle"
          aria-label="Toggle theme"
        >
          {theme === "light" ? (
            <Moon className="h-5 w-5" />
          ) : (
            <Sun className="h-5 w-5" />
          )}
        </button>
        {user ? (
          <div className="flex items-center gap-4">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                className="btn btn-ghost btn-circle avatar tooltip tooltip-left"
                data-tip={user.displayName}
              >
                <div className="w-10 rounded-full">
                  <img
                    src={user.photoURL || "https://i.pravatar.cc/300"}
                    alt={user.displayName}
                  />
                </div>
              </div>
              <ul className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                <li className="text-center font-semibold p-2">
                  {user.displayName}
                </li>
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link to="/login" className="btn btn-ghost">
              Login
            </Link>
            <Link to="/register" className="btn btn-primary">
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
