import { NextFunction, Request, Response } from "express";

function createUser(req: Request, res: Response, next: NextFunction) {
  try {
    //
  } catch (err) {
    next(err);
  }
}
