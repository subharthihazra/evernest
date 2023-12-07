import { NextFunction, Request, Response } from "express";

function ErrorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log("Middleware Error Hadnling");
  const errStatus = err.status || 500;
  const errMsg = err.message || "Something went wrong";

  res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMsg,
  });
}
