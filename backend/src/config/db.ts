import mongoose from "mongoose";

import dotenv from 'dotenv';

dotenv.config(); 

const MONGODB_URI = process.env.MONGODB_URI || "";

const connectDB = async () => {
  try {
    if (mongoose.connection.readyState >= 1) {
      console.log("MongoDB is already connected.");
      return;
    }
    await mongoose.connect(MONGODB_URI);
    console.log("mongoDB connected...");
  } catch (error) {
    throw new Error("Error in connecting to mongo db. " + error);
  }
};

export default connectDB;

