import { model, Schema } from "mongoose";
import Admin from "../types/admin";

const adminSchema: Schema<Admin> = new Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
  },
  password: {
    type: String,
    required: true,
  },
});

const adminModel = model<Admin>("Admin", adminSchema);

export default adminModel;
