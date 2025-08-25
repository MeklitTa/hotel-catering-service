import React, { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../components/Context/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } =
    useContext(StoreContext);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const oncahngeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });
    let orderData = {
      address: data,
      item: orderItems,
      amount: getTotalCartAmount() + 2,
    };

    console.log("Sending order data:", orderData);
    console.log("Food list:", food_list);
    console.log("Cart items:", cartItems);

    try {
      let response = await axios.post("/api/order/place", orderData, {
        headers: { token },
      });

      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);
      } else {
        alert("Error: " + (response.data.message || "Unknown error occurred"));
      }
    } catch (error) {
      console.error("Payment error:", error);
      if (error.response) {
        alert("Error: " + (error.response.data.message || "Payment failed"));
      } else {
        alert("Error: Unable to connect to payment system");
      }
    }
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/cart");
    } else if (getTotalCartAmount() === 0) {
      navigate("/cart");
    }
  }, [token]);
  return (
    <div>
      <form className="place-order" onSubmit={placeOrder}>
        <div className="place-order-left">
          <p className="title">Delivery Information</p>
          <div className="multi-fields">
            <input
              name="firstName"
              onChange={oncahngeHandler}
              value={data.firstName}
              type="text"
              required
              placeholder="First Name "
            />
            <input
              name="lastName"
              onChange={oncahngeHandler}
              value={data.lastName}
              type="text"
              required
              placeholder="Last Name "
            />
          </div>
          <input
            name="email"
            onChange={oncahngeHandler}
            value={data.email}
            type="email"
            placeholder="Email address"
          />
          <input
            name="street"
            onChange={oncahngeHandler}
            value={data.street}
            type="text"
            placeholder="Street"
          />
          <div className="multi-fields">
            <input
              name="city"
              onChange={oncahngeHandler}
              value={data.city}
              type="text"
              required
              placeholder="City "
            />
            <input
              name="state"
              onChange={oncahngeHandler}
              value={data.state}
              type="text"
              required
              placeholder="state"
            />
          </div>
          <div className="multi-fields">
            <input
              name="zipcode"
              onChange={oncahngeHandler}
              value={data.zipcode}
              type="text"
              required
              placeholder="Zip code "
            />
            <input
              name="country"
              onChange={oncahngeHandler}
              value={data.country}
              type="text"
              required
              placeholder="Country "
            />
          </div>
          <input
            name="phone"
            onChange={oncahngeHandler}
            value={data.phone}
            type="text"
            placeholder="Phone"
          />
        </div>
        <div className="place-order-right">
          <div className="cart-total">
            <h2>Cart Totals</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>${getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <b>Total</b>
                <b>
                  ${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
                </b>
              </div>
            </div>
            <button type="submit">PROCEED TO PAYMENT</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PlaceOrder;
