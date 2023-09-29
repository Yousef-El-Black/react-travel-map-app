import mongoose from "mongoose";
import { MONGO_DB_URI } from "../config";

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_DB_URI as string).then(() => {
      console.log("DB Connected!");
    });
  } catch (err) {
    console.log("DB Ain't Connected!: " + err);
  }
};
