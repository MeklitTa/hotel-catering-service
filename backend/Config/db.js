import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://meklit:0993702883@cluster0.votcj0h.mongodb.net/food-delivery"
    )
    .then(() => {
      console.log("DB connected");
    });
};
