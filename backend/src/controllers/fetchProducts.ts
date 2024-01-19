import { Request, Response } from "express";
import productModel from "../models/products";
import { Product } from "types/product";

function getAllProducts(req: Request, res: Response) {
  res.send("Hi");
}

module.exports = getAllProducts;
