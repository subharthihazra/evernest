import { NextFunction, Request, Response } from "express";
import productModel from "../models/products";
import { Product } from "types/product";

export async function getProductFromId(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { prodId } = req.params;
  } catch (error) {}
}
