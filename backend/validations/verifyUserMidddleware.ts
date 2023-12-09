import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import User from "../types/user";
import { JWT_SECRET_KEY } from "../config/env";
import { DataStoredInToken, RequestWithUser } from "../types/token";
import userModel from "../models/users";
import { CustomError } from "../errorhandlers/CustomError";

export default async function verifyUserMidddleware(
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) {
  try {
    const Authorization =
      req.cookies["Authorization"] ||
      (req.header("Authorization")
        ? req.header("Authorization").split("Bearer ")[1]
        : null);

    if (!Authorization) {
      return next(new CustomError(404, "Authentication token missing"));
    }
    const secretKey: string = String(JWT_SECRET_KEY);
    const verificationResponse = (await verify(
      Authorization,
      secretKey
    )) as DataStoredInToken;
    const userId = verificationResponse._id;
    const foundUser = await userModel.findById(userId);

    if (!foundUser) {
      return next(new CustomError(401, "Wrong authentication token"));
    }
    req.user = foundUser;
    next();
  } catch (error) {
    next(new CustomError(401, "Wrong authentication token"));
  }
}
