import React from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { useState } from "react";

const Navbar = () => {
  const [token, setToken] = useState("");
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    // Clear all localStorage data
    localStorage.clear();
    // Redirect to frontend with a logout parameter
    window.location.href = "http://localhost:5173/logout";
  };
  return (
    <div className="navbar">
      <img className="logo" src={assets.logo} alt="logo" />
      <div className="navbar-right">
        <img className="profile" src={assets.profile_image} alt="profile" />
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
