import { model, Schema, Document, Types } from "mongoose";

interface Cart extends Document {
  userId: Types.ObjectId;
  description?: string;
  products: CartProduct[];
}

interface CartProduct {
  productId: Types.ObjectId;
  quantity: number;
}

const cartSchema: Schema<Cart> = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  description: {
    type: String,
  },
  products: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        required: true,
      },

      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
    },
  ],
});

const cartModel = model<Cart>("Cart", cartSchema);

export default cartModel;
