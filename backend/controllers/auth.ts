import { NextFunction, Request, Response } from "express";
import userModel from "../models/users";
import { CustomError } from "../errorhandlers/CustomError";

export function signin(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;
    if (email && password) {
      console.log(userModel.find({ email: email }));
    }
  } catch (err) {
    next(err);
  }
}

export function signup(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password, name } = req.body;
    if (!(email && password && name)) {
      next(new CustomError(400, "Not enough data provided"));
    }
    console.log(email, password);
    userModel.create({ email, password, name });
    res.status(201).json({ success: true, email, name });
  } catch (err) {
    next(err);
  }
}
