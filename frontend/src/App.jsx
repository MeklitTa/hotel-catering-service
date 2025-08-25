import React, { useState, useEffect } from "react";
import Navbar from "./components/NavbarSec/Navbar.jsx";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Cart from "./pages/Cart/Cart.jsx";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Login from "./components/Login/Login.jsx";
import Verify from "./pages/verify/Verify.jsx";
import MyOrders from "./pages/Myorders/MyOrders.jsx";

// Logout component that handles clearing localStorage and redirecting
const LogoutHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear all localStorage data
    localStorage.clear();
    // Redirect to home page
    navigate("/", { replace: true });
  }, [navigate]);

  return null; // This component doesn't render anything
};

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {showLogin ? <Login setShowLogin={setShowLogin} /> : <></>}
      <div className="app">
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/myorders" element={<MyOrders />} />
          <Route path="/logout" element={<LogoutHandler />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
