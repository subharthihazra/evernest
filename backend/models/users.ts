import { model, Schema, Document } from "mongoose";
import { hash } from "bcrypt";

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
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
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
    this.password = await hash(this.password, 10);

    next();
  } catch (err) {
    console.log(err);
  }
});

const userModel = model<User>("User", userSchema);

export default userModel;
