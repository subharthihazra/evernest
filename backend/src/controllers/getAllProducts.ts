import { Request, Response } from "express";

function getAllProducts(req: Request, res: Response) {
  res.send("Hi");
}

module.exports = getAllProducts;
