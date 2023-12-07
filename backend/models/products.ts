import { model, Schema, Document } from "mongoose";

interface Product extends Document {
  name: string;
  description?: string;
  variant: Variant[];
}

interface Variant {
  size: "XS" | "S" | "M" | "L" | "XL" | "XXL" | "XXXL";
  price: number;
  stock: number;
}

const productSchema: Schema<Product> = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  variant: [
    {
      size: {
        type: String,
        enum: ["XS", "S", "M", "L", "XL", "XXL", "XXXL"],
        required: true,
      },
      price: {
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
