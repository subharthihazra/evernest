import { NextFunction, Request, Response } from "express";
import { sign } from "jsonwebtoken";
import { CustomError } from "../errorhandlers/CustomError";
import Admin from "../types/admin";
import { JWT_SECRET_KEY } from "../config/env";
import { DataStoredInAdminToken, TokenData } from "../types/token";
import adminModel from "../models/admin";

export async function adminSignin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    let { username, password }: { username: string; password: string } =
      req.body;
    if (!(username && password)) {
      return next(new CustomError(400, "Not enough data provided"));
    }
    const foundAdmin = await adminModel.findOne(
      {
        username,
        password,
      },
      {
        username: 1,
      }
    );
    if (!foundAdmin) {
      return next(new CustomError(401, "Invalid email or password"));
    }
    const tokenData = createToken(foundAdmin);
    const cookie = createCookie(tokenData);

    res.setHeader("Set-Cookie", [cookie]);
    res
      .status(201)
      .json({ success: true, data: foundAdmin, message: "adminlogin" });
  } catch (err) {
    next(err);
  }
}

function createToken(admin: Admin): TokenData {
  // console.log(user);
  const dataStoredInToken: DataStoredInAdminToken = {
    username: admin.username,
  };
  const secretKey: string = String(JWT_SECRET_KEY);
  const expiresIn: number = 2 * 60 * 60;

  return {
    expiresIn,
    token: sign(dataStoredInToken, secretKey, { expiresIn }),
  };
}

function createCookie(tokenData: TokenData): string {
  return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}; SameSite=None;  Secure`;
}

export async function logout(req: Request, res: Response, next: NextFunction) {
  try {
    const adminData: Admin = req.admin;
    if (!adminData) {
      return next(new CustomError(400, "userData is empty"));
    }
    if (!adminData.username) {
      return next(new CustomError(400, "userData is empty"));
    }

    const foundAdmin: any = await adminModel.findOne(
      {
        username: adminData.username,
      },
      {
        username: 1,
      }
    );
    if (!foundAdmin) {
      throw new CustomError(
        409,
        `This email ${foundAdmin.username} was not found`
      );
    }

    res.setHeader("Set-Cookie", ["Authorization=; Max-age=0"]);
    res
      .status(200)
      .json({ success: true, data: foundAdmin, message: "adminloggedout" });
  } catch (error) {
    next(error);
  }
}
