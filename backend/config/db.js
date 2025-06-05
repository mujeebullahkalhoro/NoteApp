import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database is connected");
  } catch (error) {
    console.log("Database is not connected", error);
  }
};

export default connectDb;
