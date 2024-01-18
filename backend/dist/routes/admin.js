"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_1 = require("../controllers/admin");
const verifyAdminMiddleware_1 = require("../validations/verifyAdminMiddleware");
const modProducts_1 = require("../controllers/modProducts");
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)();
const router = (0, express_1.Router)();
router.post("/signin", admin_1.adminSignin);
router.use(verifyAdminMiddleware_1.verifyAdminMiddleware);
router.post("/logout", admin_1.logout);
router.get("/product/id/:prodId", modProducts_1.getProductFromId);
router.post("/product/upload", upload.any(), modProducts_1.addProduct);
exports.default = router;
