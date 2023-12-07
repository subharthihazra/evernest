import { model, Schema, Document } from "mongoose";
import hashPassword from "../encrypt/hash";
import {
  validateEmail,
  validatePassword,
  validateName,
} from "../validations/auth";

interface User extends Document {
  _id: string;
  email: string;
  password: string;
  name: string;
  isEmailVerified: boolean;
  createdAt: Date;
}

const userSchema: Schema<User> = new Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    validate: {
      validator: validateEmail,
      message: () => "Not a valid email",
    },
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: validatePassword,
      message: () => "Password not matching the criteria",
    },
  },
  name: {
    type: String,
    required: true,
    validate: {
      validator: validateName,
      message: () => "Name not matching the criteria",
    },
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
  },
});

userSchema.pre("save", async function (next) {
  try {
    this.name = this.name.trim();
    this.password = await hashPassword(this.password);
    next();
  } catch (err: any) {
    throw err;
  }
});

const userModel = model<User>("User", userSchema);

export default userModel;
