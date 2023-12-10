"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const cartSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
    },
    description: {
        type: String,
    },
    products: [
        {
            productId: {
                type: mongoose_1.Schema.Types.ObjectId,
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
const cartModel = (0, mongoose_1.model)("Cart", cartSchema);
exports.default = cartModel;
