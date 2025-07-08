import mongoose from "mongoose";
import { env } from "./envConfig";
import { messages } from "../common/messages";

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(env.MONGO_URI, {
      dbName: process.env.DATABASE_NAME || "",
    });
    console.log(messages.DB_CONNECT_SUCESS);
  } catch (error) {
    console.error(messages.DB_CONNECT_FAILED, error);
    process.exit(1);
  }
};

export default connectDB;
