import React, { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";

const List = ({ url }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchlist = async () => {
    try {
      console.log("Fetching data from:", `${url}/api/food/list`);
      setLoading(true);
      setError(null);
      
      const response = await axios.get(`${url}/api/food/list`);
      console.log("Response received:", response);
      console.log("Response data:", response.data);
      
      if (response.data.success) {
        setList(response.data.data);
        console.log("Data set successfully:", response.data.data);
      } else {
        console.error("API returned success: false");
        setError("Failed to fetch data");
        toast.error("Error fetching data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message);
      toast.error(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const removeFood = async (foodId) => {
    try {
      const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
      await fetchlist();
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error("Error");
      }
    } catch (error) {
      console.error("Error removing food:", error);
      toast.error("Error removing food");
    }
  };

  useEffect(() => {
    fetchlist();
  }, []);

  if (loading) {
    return <div className="list add flex-col">Loading...</div>;
  }

  if (error) {
    return <div className="list add flex-col">Error: {error}</div>;
  }

  return (
    <div className="list add flex-col">
      <p>All foods List</p>
      <div className="list-table">
        <div className="list-table-format title ">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.length === 0 ? (
          <div className="list-table-format">
            <p>No foods found</p>
          </div>
        ) : (
          list.map((item, index) => {
            return (
              <div key={index} className="list-table-format">
                <img
                  src={`${url}/images/` + item.Image}
                  alt="list of food image"
                />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>${item.price}</p>
                <p onClick={() => removeFood(item._id)} className="cursor">
                  X
                </p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default List;
