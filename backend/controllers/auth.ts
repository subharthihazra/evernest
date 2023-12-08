import { NextFunction, Request, Response } from "express";
import { sign } from "jsonwebtoken";
import userModel from "../models/users";
import { CustomError } from "../errorhandlers/CustomError";
import User from "../types/user";
import { JWT_SECRET_KEY } from "../config/env";

export interface DataStoredInToken {
  _id: string;
  email: string;
}

export interface TokenData {
  token: string;
  expiresIn: number;
}

export interface RequestWithUser extends Request {
  user: User;
}

export async function signin(req: Request, res: Response, next: NextFunction) {
  try {
    let { email, password }: { email: string; password: string } = req.body;
    if (!(email && password)) {
      return next(new CustomError(400, "Not enough data provided"));
    }
    const foundUser = await userModel.validateUserCredentials(email, password);
    if (!foundUser) {
      return next(new CustomError(400, "Invalid email or password"));
    }
    const tokenData = createToken(foundUser);
    const cookie = createCookie(tokenData);

    res.setHeader("Set-Cookie", [cookie]);
    res
      .status(201)
      .json({ success: true, data: foundUser, message: "loggedin" });
  } catch (err) {
    next(err);
  }
}

export async function signup(req: Request, res: Response, next: NextFunction) {
  try {
    const {
      email,
      password,
      name,
    }: { email: string; password: string; name: string } = req.body;
    if (!(email && password && name)) {
      return next(new CustomError(400, "Not enough data provided"));
    }

    console.log("New User:", email);
    try {
      const createdUser: User = await userModel.create({
        email,
        password,
        name,
      });
      res.status(201).json({
        success: true,
        email: createdUser.email,
        name: createdUser.name,
      });
    } catch (err: any) {
      console.log("ERROR: ", err.code, err.name);
      if (err.name === "MongoServerError" && err.code === 11000) {
        return next(new CustomError(400, "Email is already used"));
      } else {
        return next(new CustomError(400, err.message));
      }
    }
  } catch (err) {
    next(err);
  }
}

function createToken(user: User): TokenData {
  // console.log(user);
  const dataStoredInToken: DataStoredInToken = {
    _id: user._id,
    email: user.email,
  };
  const secretKey: string = String(JWT_SECRET_KEY);
  const expiresIn: number = 60 * 60;

  return {
    expiresIn,
    token: sign(dataStoredInToken, secretKey, { expiresIn }),
  };
}

function createCookie(tokenData: TokenData): string {
  return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
}
