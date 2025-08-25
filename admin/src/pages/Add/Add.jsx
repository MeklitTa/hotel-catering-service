import React, { useState } from "react";
import axios from "axios";
import "./add.css";
import { assets } from "../../assets/assets";
import { toast } from "react-toastify";

const Add = ({ url }) => {
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Traditional Food",
  });

  const onchangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHndler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);
    const response = await axios.post(`${url}/api/food/add`, formData);
    if (response.data.success) {
      setData({
        name: "",
        description: "",
        price: "",
        category: "Traditional Food",
      });
      setImage(false);
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHndler}>
        <div className="add-img-upload flex-col ">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt="upload area"
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />
        </div>
        <div className="add-product-name flex-col">
          <p>Product name</p>
          <input
            onChange={onchangeHandler}
            value={data.name}
            type="text"
            name="name"
            placeholder="type here"
          />
        </div>
        <div className="add-product-description flex-col">
          <p>Product description</p>
          <textarea
            name="description"
            rows="6"
            placeholder="Write content here"
            onChange={onchangeHandler}
            value={data.description}
          ></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product category</p>
            <select name="category" value={data.category} onChange={onchangeHandler}>
              <option value="Traditional Food">Traditional Food</option>
              <option value="Foreign Cuisine">Foreign Cuisine</option>
              <option value="Deserts">Deserts</option>
              <option value="Fast Food">Fast Food</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Cold Drinks">Cold Drinks</option>
              <option value="Hot Drinks">Hot Drinks</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product Price</p>
            <input
              onChange={onchangeHandler}
              value={data.price}
              type="Number"
              name="price"
              placeholder="$20"
            />
          </div>
        </div>
        <button type="submit" className="add-button">
          ADD
        </button>
      </form>
    </div>
  );
};

export default Add;
