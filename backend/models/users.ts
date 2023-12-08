import { model, Schema, Document, Model } from "mongoose";
import { hashPassword, comparePasswords } from "../encrypt/hash";
import {
  validateEmail,
  validatePassword,
  validateName,
} from "../validations/auth";
import User from "../types/user";

interface UserModel extends Model<User> {
  validateUserCredentials(email: string, password: string): Promise<boolean>;
}

const userSchema: Schema<User, UserModel> = new Schema({
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
    this.email = this.email.trim();
    this.password = await hashPassword(this.password);
    next();
  } catch (err: any) {
    throw err;
  }
});

userSchema.statics.validateUserCredentials = async function (
  email: string,
  password: string
) {
  if (!(validateEmail(email) && validatePassword(password))) {
    return false;
  }
  const foundUser: any = await this.findOne({ email });
  // console.log("pp", foundUser);
  if (!foundUser) {
    return false;
  }
  return await comparePasswords(password, foundUser.password);
};

const userModel = model<User, UserModel>("User", userSchema);

export default userModel;
