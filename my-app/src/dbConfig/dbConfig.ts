import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URL!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB connected successfully");
    });
    connection.on("error", () => {
      console.log("MongoDB connection error");
    });
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}
