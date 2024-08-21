import mongoose from "mongoose";

const connectDB = async () => {
  const DataBase = process.env.DB_URL || 3002;
  try {
    await mongoose.connect(DataBase);
    console.log("Database connected");
  } catch (error) {
    console.log("database connection fails", error);
  }
};

export default connectDB;
