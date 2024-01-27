"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
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
const productModel = (0, mongoose_1.model)("Product", productSchema);
exports.default = productModel;
