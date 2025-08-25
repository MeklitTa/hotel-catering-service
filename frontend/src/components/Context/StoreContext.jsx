import axios from "axios";
import { createContext, useEffect, useState } from "react";
// import { food_list } from "../../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const url = import.meta.env.url;
  axios.defaults.baseURL = url;
  const [token, setToken] = useState("");
  const [cartItems, setCartItems] = useState({});
  const [food_list, setFoodList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredFoodList, setFilteredFoodList] = useState([]);
  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      await axios.post("/api/cart/add", { itemId }, { headers: { token } });
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      await axios.post("/api/cart/remove", { itemId }, { headers: { token } });
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;

    for (const item in cartItems) {
      if (cartItems[item]) {
        let itemInfo = food_list.find((product) => product._id === item);
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };
  const fetchFoodList = async () => {
    try {
      const response = await axios.get(url + "/api/food/list");
      console.log("Food list response:", response.data); // Debug log
      setFoodList(response.data.data);
    } catch (error) {
      console.error("Error fetching food list:", error);
    }
  };
  const loadCartData = async (token) => {
    const response = await axios.post(
      "/api/cart/get",
      {},
      { headers: { token } }
    );
    setCartItems(response.data.cartData);
  };

  // Search function
  const searchFood = (query) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setFilteredFoodList(food_list);
    } else {
      const filtered = food_list.filter(
        (food) =>
          food.name.toLowerCase().includes(query.toLowerCase()) ||
          food.category.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredFoodList(filtered);
    }
  };

  // Update filtered list when food_list changes
  useEffect(() => {
    setFilteredFoodList(food_list);
  }, [food_list]);

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();

      // Only load token if it exists and is not empty
      const storedToken = localStorage.getItem("token");
      if (storedToken && storedToken.trim() !== "") {
        setToken(storedToken);
        await loadCartData(storedToken);
      } else {
        // Ensure token state is empty if no valid token exists
        setToken("");
        setCartItems({});
      }
    }
    loadData();
  }, []);

  const contextValue = {
    axios,
    food_list,
    filteredFoodList,
    searchQuery,
    searchFood,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;

// const removeFromCart = (itemId) => {
//     setCartItems((prev) => {
//       const newCount = prev[itemId] - 1;
//       if (newCount <= 0) {
//         const newCartItems = { ...prev };
//         delete newCartItems[itemId];
//         return newCartItems;
//       }
//       return { ...prev, [itemId]: newCount };
//     });
//   };
