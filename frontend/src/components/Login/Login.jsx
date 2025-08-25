import React, { useContext, useState } from "react";
import "./Login.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../Context/StoreContext";
import axios from "axios";

const Login = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);
  const [currentState, setCurrentState] = useState("Sign Up");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };
  const onLogin = async (event) => {
    event.preventDefault();
    try {
      let newUrl = url;
      if (currentState === "Login") {
        newUrl += "/api/user/login";
      } else {
        newUrl += "/api/user/register";
      }
      const response = await axios.post(newUrl, data);
      if (response.data.success) {
        if (response.data.admin) {
          window.location.href = "http://localhost:5174/add";
        }
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setShowLogin(false);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred. Please try again.");
    }
  };
  return (
    <div className="login-popup">
      <form className="login-popup-container" onSubmit={onLogin}>
        <div className="login-popup-title">
          <h2>{currentState}</h2>
          <img
            src={assets.cross_icon}
            alt=""
            onClick={() => setShowLogin(false)}
          />
        </div>
        <div className="login-popup-inputs">
          {currentState === "Login" ? (
            <></>
          ) : (
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={onChangeHandler}
              placeholder="Your Name"
              required
            />
          )}

          <input
            type="email"
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            placeholder="Your email"
            required
          />
          <input
            type="password"
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            placeholder="Passwored"
            required
          />
        </div>
        <button type="submit">
          {currentState === "Sign Up" ? "Create account" : "Login"}
        </button>
        <div className="login-popup-condtion">
          <input type="checkbox" required />
          <p>
            By continuing, i agree to the terms of the use & privacy policy.
          </p>
        </div>
        {currentState === "Login" ? (
          <p>
            Create a new account?
            <span onClick={() => setCurrentState("Sign Up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account?
            <span onClick={() => setCurrentState("Login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;
