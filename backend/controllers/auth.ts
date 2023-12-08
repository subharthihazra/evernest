import { NextFunction, Request, Response } from "express";
import userModel from "../models/users";
import { CustomError } from "../errorhandlers/CustomError";
import User from "../types/user";

export async function signin(req: Request, res: Response, next: NextFunction) {
  try {
    let { email, password }: { email: string; password: string } = req.body;
    if (!(email && password)) {
      next(new CustomError(400, "Not enough data provided"));
    }

    if (await userModel.validateUserCredentials(email, password)) {
      res.status(201).json({ success: true });
    } else {
      res.status(201).json({ success: false });
    }
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
      next(new CustomError(400, "Not enough data provided"));
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
        next(new CustomError(400, "Email is already used"));
      } else {
        next(new CustomError(400, err.message));
      }
    }
  } catch (err) {
    next(err);
  }
}

// export function createToken(user: User): TokenData {
//   const dataStoredInToken: DataStoredInToken = { _id: user._id };
//   const secretKey: string = SECRET_KEY;
//   const expiresIn: number = 60 * 60;

//   return {
//     expiresIn,
//     token: sign(dataStoredInToken, secretKey, { expiresIn }),
//   };
// }

// export function createCookie(tokenData: TokenData): string {
//   return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
// }
