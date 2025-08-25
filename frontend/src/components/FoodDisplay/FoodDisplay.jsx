import React, { useContext } from "react";
import "./FoodDisplay.css";
import { food_list } from "../../assets/assets";
import { StoreContext } from "../Context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";

const FoodDisplay = ({ category }) => {
  const { filteredFoodList, searchQuery } = useContext(StoreContext);

  // Use filteredFoodList if there's a search query, otherwise use original logic
  const displayList = searchQuery ? filteredFoodList : filteredFoodList;

  return (
    <div className="food-display" id="food-display">
      <h2>
        {searchQuery
          ? `Search Results for "${searchQuery}"`
          : "Top Dishes near you"}
      </h2>
      <div className="food-display-list">
        {displayList.map((item, index) => {
          const selectedCategory = (category || "").toLowerCase().trim();
          const itemCategory = ((item && item.category) || "")
            .toLowerCase()
            .trim();
          if (selectedCategory === "all" || selectedCategory === itemCategory) {
            return (
              <FoodItem
                key={index}
                id={item._id}
                name={item.name}
                description={item.description}
                image={item.Image}
                price={item.price}
              />
            );
          }
          return null;
        })}
      </div>
      {searchQuery && displayList.length === 0 && (
        <div className="no-results">
          <p>No food items found for "{searchQuery}"</p>
        </div>
      )}
    </div>
  );
};

export default FoodDisplay;
