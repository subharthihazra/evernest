import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../config/env";
import { DataStoredInAdminToken } from "../types/token";
import { CustomError } from "../errorhandlers/CustomError";
import adminModel from "../models/admin";

export async function verifyAdminMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const Authorization =
      req.cookies["Authorization"] ||
      req.header("Authorization")?.split("Bearer ")[1];

    if (!Authorization) {
      return next(new CustomError(404, "Authentication token missing"));
    }
    const secretKey: string = String(JWT_SECRET_KEY);
    const verificationResponse = (await verify(
      Authorization,
      secretKey
    )) as DataStoredInAdminToken;
    if (!verificationResponse.username?.trim()) {
      return next(new CustomError(401, "Wrong authentication token"));
    }
    const foundAdmin = await adminModel.findOne(
      {
        username: verificationResponse.username,
      },
      {
        username: 1,
      }
    );

    if (!foundAdmin) {
      return next(new CustomError(401, "Wrong authentication token"));
    }
    req.admin = foundAdmin;
    next();
  } catch (error) {
    next(new CustomError(401, "Wrong authentication token"));
  }
}
