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
    const result: any = await productModel.findOne({ _id: prodId });
    if (!result || result?.length === 0) {
      return res.status(200).json({ msg: "notfound" });
    } else {
      return res.status(200).json({ msg: "success", data: result });
    }
  } catch (error) {
    return res.status(200).json({ msg: "notfound" });
  }
}

export async function addProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { productName, productDetails, variant } = req.body;
    if (!productName || productName?.trim() === "")
      next(new CustomError(400, "No product name"));
    if (!productDetails || productDetails?.trim() === "")
      next(new CustomError(400, "No product details"));

    const rowSet = new Set();
    for (const sz of variant.map((x: any) => x?.size)) {
      if (sz === "--") next(new CustomError(400, "Err variant"));
      if (rowSet.has(sz)) next(new CustomError(400, "Err variant"));
      rowSet.add(sz);
    }

    const result: any = await productModel.create({
      name: productName,
      description: productDetails,
      variant: variant.map((v: any) => ({
        size: v.size,
        originalPrice: v.originalPrice,
        currentPrice: v.currentPrice,
        stock: v.stock,
      })),
    });

    if (!result || result?.length === 0) {
      next(new CustomError(500, "data add failed"));
    }
    // console.log(result);

    await uploadImg(req?.files[0], async (url: any, fileId: any) => {
      const result2: any = await productModel.updateOne(
        { _id: result._id },
        { imgUrl: url, imageId: fileId }
      );
      // console.log(result2);
      if (result2?.acknowledged) {
        res.status(201).json({ msg: "success", data: { id: result._id } });
      } else {
        next(new CustomError(500, "Img store problem"));
      }
    });
  } catch (error) {
    next(new CustomError(500, "Server Error"));
  }
}

export async function updateProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { prodId } = req.params;
    const { name, description, variant } = req.body;
    if (!prodId || prodId?.trim() === "")
      next(new CustomError(400, "No product ID"));
    if (!name || name?.trim() === "")
      next(new CustomError(400, "No product name"));
    if (!description || description?.trim() === "")
      next(new CustomError(400, "No product details"));

    const rowSet = new Set();
    for (const sz of variant.map((x: any) => x?.size)) {
      if (sz === "--") next(new CustomError(400, "Err variant"));
      if (rowSet.has(sz)) next(new CustomError(400, "Err variant"));
      rowSet.add(sz);
    }

    const result: any = await productModel.updateOne(
      { _id: prodId },
      {
        name: name,
        description: description,
        variant: variant.map((v: any) => ({
          size: v.size,
          originalPrice: v.originalPrice,
          currentPrice: v.currentPrice,
          stock: v.stock,
        })),
      }
    );

    if (!result?.acknowledged) {
      next(new CustomError(500, "data update failed"));
    }
    // console.log(result);
    if (req?.files && req.files[0]) {
      await uploadImg(req?.files[0], async (url: any) => {
        const result2: any = await productModel.updateOne(
          { _id: prodId },
          { imgUrl: url }
        );
        // console.log(result2);
        if (result2?.acknowledged) {
          res.status(201).json({ msg: "success" });
        } else {
          next(new CustomError(500, "Img store problem"));
        }
      });
    } else {
      res.status(201).json({ msg: "success" });
    }
  } catch (error) {
    console.log(error);
    next(new CustomError(500, "Server Error"));
  }
}
