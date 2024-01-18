"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addProduct = exports.getProductFromId = void 0;
const products_1 = __importDefault(require("../models/products"));
const uploadFile_1 = require("./uploadFile");
const CustomError_1 = require("../errorhandlers/CustomError");
function getProductFromId(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { prodId } = req.params;
            const result = products_1.default.findOne({ _id: prodId });
            if ((result === null || result === void 0 ? void 0 : result.length) === 0) {
                return res.status(400).json({ msg: "notfound" });
            }
            else {
                return res.status(200).json({ msg: "success", data: result });
            }
        }
        catch (error) { }
    });
}
exports.getProductFromId = getProductFromId;
function addProduct(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { productName, productDetails, varients } = req.body;
            if (!productName || (productName === null || productName === void 0 ? void 0 : productName.trim()) === "")
                throw new CustomError_1.CustomError(400, "No product name");
            if (!productDetails || (productDetails === null || productDetails === void 0 ? void 0 : productDetails.trim()) === "")
                throw new CustomError_1.CustomError(400, "No product details");
            const rowSet = new Set();
            for (const sz of varients.map((x) => x === null || x === void 0 ? void 0 : x.size)) {
                if (sz === "--")
                    throw new CustomError_1.CustomError(400, "Err varients");
                if (rowSet.has(sz))
                    throw new CustomError_1.CustomError(400, "Err varients");
                rowSet.add(sz);
            }
            const result = yield products_1.default.create({
                name: productName,
                description: productDetails,
                variant: varients.map((v) => ({
                    size: v.size,
                    originalPrice: v.originalPrice,
                    currentPrice: v.currentPrice,
                    stock: v.stock,
                })),
            });
            // console.log(result);
            yield (0, uploadFile_1.uploadImg)(req === null || req === void 0 ? void 0 : req.files[0], (url) => __awaiter(this, void 0, void 0, function* () {
                const result2 = yield products_1.default.updateOne({ _id: result._id }, { imgUrl: url });
                if ((result === null || result === void 0 ? void 0 : result.length) !== 0) {
                    res.status(201).json({ msg: "success" });
                }
                else {
                    throw new CustomError_1.CustomError(500, "Img store problem");
                }
            }));
        }
        catch (error) { }
    });
}
exports.addProduct = addProduct;
