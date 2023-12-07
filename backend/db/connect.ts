import { MONGO_URI } from "../config/env";
import mongoose from "mongoose";

export const connectionDB = () => {
  return mongoose.connect(String(MONGO_URI));
};
