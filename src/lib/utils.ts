import mongoose from "mongoose";

const connection: { isConnected?: number } = {};

export const connectToDb = async () => {
  try {
    if (connection.isConnected) {
      console.log("Using existing connection");
      return;
    }
    const db = await mongoose.connect(process.env.MONGO!);
    connection.isConnected = db.connection.readyState || 1;
  } catch (error) {
    console.log(error);
    throw new Error(
      typeof error === "string"
        ? error
        : "An error occurred while connecting to the database"
    );
  }
};
