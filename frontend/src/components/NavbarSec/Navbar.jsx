import React, { useContext, useState, useEffect, useRef } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../components/Context/StoreContext";
import MyOrders from "../../pages/Myorders/MyOrders.jsx";

const navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const { getTotalCartAmount, token, setToken, searchFood } =
    useContext(StoreContext);
  const navigate = useNavigate();
  const mobileMenuRef = useRef();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setShowMobileMenu(false);
      }
    };

    if (showMobileMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMobileMenu]);
  return (
    <div className="navbar">
      <Link to="/">
        <img src={assets.logo} alt="logo" className="logo" />
      </Link>
      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          Home
        </Link>
        <a
          href="#explore-menu"
          onClick={() => setMenu("menu")}
          className={menu === "menu" ? "active" : ""}
        >
          Menu
        </a>
        <a
          href="#app-download"
          onClick={() => setMenu("mobile-app")}
          className={menu === "mobile-app" ? "active" : ""}
        >
          Mobile-app
        </a>
        <a
          href="#footer"
          onClick={() => setMenu("contact")}
          className={menu === "contact" ? "active" : ""}
        >
          Contact us
        </a>
      </ul>
      <div className="navbar-right">
        {/* Search Section */}
        <div className="search-section">
          {showSearch && (
            <input
              type="text"
              placeholder="Search food..."
              className="search-input"
              onChange={(e) => searchFood(e.target.value)}
            />
          )}
          <img
            src={assets.search_icon}
            alt="search"
            onClick={() => setShowSearch(!showSearch)}
            className="search-icon"
          />
        </div>

        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="cart" />
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>

        {/* Mobile Menu Toggle */}
        <div
          className="mobile-menu-toggle"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        >
          <div className={`hamburger ${showMobileMenu ? "active" : ""}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        {/* Desktop Auth Section */}
        <div className="desktop-auth">
          {!token ? (
            <button onClick={() => setShowLogin(true)}>Sign in</button>
          ) : (
            <div className="navbar-profile">
              <img src={assets.profile_icon} alt="profile" />
              <ul className="nav-profile-dropdown">
                <li
                  onClick={() => {
                    navigate("/myorders");
                  }}
                >
                  <img src={assets.bag_icon} alt="" /> <p>Orders</p>
                </li>
                <hr />
                <li onClick={logout}>
                  <img src={assets.logout_icon} alt="" />
                  <p>Logout</p>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`mobile-menu ${showMobileMenu ? "show" : ""}`}
        ref={mobileMenuRef}
      >
        <ul className="mobile-menu-items">
          <Link
            to="/"
            onClick={() => {
              setMenu("home");
              setShowMobileMenu(false);
            }}
            className={menu === "home" ? "active" : ""}
          >
            Home
          </Link>
          <a
            href="#explore-menu"
            onClick={() => {
              setMenu("menu");
              setShowMobileMenu(false);
            }}
            className={menu === "menu" ? "active" : ""}
          >
            Menu
          </a>
          <a
            href="#app-download"
            onClick={() => {
              setMenu("mobile-app");
              setShowMobileMenu(false);
            }}
            className={menu === "mobile-app" ? "active" : ""}
          >
            Mobile-app
          </a>
          <a
            href="#footer"
            onClick={() => {
              setMenu("contact");
              setShowMobileMenu(false);
            }}
            className={menu === "contact" ? "active" : ""}
          >
            Contact us
          </a>
        </ul>

        {/* Mobile Auth Section */}
        <div className="mobile-auth">
          {!token ? (
            <button
              onClick={() => {
                setShowLogin(true);
                setShowMobileMenu(false);
              }}
            >
              Sign in
            </button>
          ) : (
            <div className="mobile-profile-options">
              <button
                onClick={() => {
                  navigate("/myorders");
                  setShowMobileMenu(false);
                }}
              >
                <img src={assets.bag_icon} alt="" />
                My Orders
              </button>
              <button
                onClick={() => {
                  logout();
                  setShowMobileMenu(false);
                }}
              >
                <img src={assets.logout_icon} alt="" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default navbar;
