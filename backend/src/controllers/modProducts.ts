import { NextFunction, Request, Response } from "express";
import productModel from "../models/products";
import { Product } from "types/product";
import { uploadImg } from "./uploadFile";
import { CustomError } from "../errorhandlers/CustomError";

export async function getProductFromId(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { prodId } = req.params;
    const result: any = productModel.findOne({ _id: prodId });
    if (result?.length === 0) {
      return res.status(400).json({ msg: "notfound" });
    } else {
      return res.status(200).json({ msg: "success", data: result });
    }
  } catch (error) {}
}

export async function addProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { productName, productDetails, varients } = req.body;
    if (!productName || productName?.trim() === "")
      throw new CustomError(400, "No product name");
    if (!productDetails || productDetails?.trim() === "")
      throw new CustomError(400, "No product details");

    const rowSet = new Set();
    for (const sz of varients.map((x: any) => x?.size)) {
      if (sz === "--") throw new CustomError(400, "Err varients");
      if (rowSet.has(sz)) throw new CustomError(400, "Err varients");
      rowSet.add(sz);
    }

    const result: any = await productModel.create({
      name: productName,
      description: productDetails,
      variant: varients.map((v: any) => ({
        size: v.size,
        originalPrice: v.originalPrice,
        currentPrice: v.currentPrice,
        stock: v.stock,
      })),
    });
    console.log(result);

    await uploadImg(req?.files[0], async (url: any) => {
      await productModel.updateOne({ _id: result._id }, { imgUrl: url });
    });
  } catch (error) {}
}
