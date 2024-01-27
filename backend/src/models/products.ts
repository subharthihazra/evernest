import { model, Schema, Document } from "mongoose";
import { Product } from "types/product";

const productSchema: Schema<Product> = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  imgUrl: {
    type: String,
  },
  imgId: {
    type: String,
  },
  variant: [
    {
      size: {
        type: String,
        enum: ["XS", "S", "M", "L", "XL", "XXL", "XXXL"],
        required: true,
      },
      originalPrice: {
        type: Number,
        required: true,
      },
      currentPrice: {
        type: Number,
        required: true,
      },
      stock: {
        type: Number,
        required: true,
        default: 0,
      },
    },
  ],
});

const productModel = model<Product>("Product", productSchema);

export default productModel;
