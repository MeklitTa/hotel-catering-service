import userModel from "../models/userModel.js";
const addToCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = userData.cartData || {};
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: "Add to cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error adding to cart" });
  }
};

const removeFromCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = userData.cartData;
    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
    }

    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: "Removed from cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error removing from cart" });
  }
};

const getCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = userData.cartData || {};
    res.json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error getting cart" });
  }
};

export { addToCart, removeFromCart, getCart };
