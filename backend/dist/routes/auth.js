"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const verifyUserMidddleware_1 = __importDefault(require("../validations/verifyUserMidddleware"));
const router = (0, express_1.Router)();
router.post("/signup", auth_1.signup);
router.post("/signin", auth_1.signin);
router.delete("/logout", verifyUserMidddleware_1.default, auth_1.logout);
exports.default = router;
