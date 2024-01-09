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
exports.logout = exports.adminSignin = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const CustomError_1 = require("../errorhandlers/CustomError");
const env_1 = require("../config/env");
const admin_1 = __importDefault(require("../models/admin"));
function adminSignin(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let { username, password } = req.body;
            if (!(username && password)) {
                return next(new CustomError_1.CustomError(400, "Not enough data provided"));
            }
            const foundAdmin = yield admin_1.default.findOne({
                username,
                password,
            }, {
                username: 1,
            });
            if (!foundAdmin) {
                return next(new CustomError_1.CustomError(401, "Invalid email or password"));
            }
            const tokenData = createToken(foundAdmin);
            const cookie = createCookie(tokenData);
            res.setHeader("Set-Cookie", [cookie]);
            res
                .status(201)
                .json({ success: true, data: foundAdmin, message: "adminlogin" });
        }
        catch (err) {
            next(err);
        }
    });
}
exports.adminSignin = adminSignin;
function createToken(admin) {
    // console.log(user);
    const dataStoredInToken = {
        username: admin.username,
    };
    const secretKey = String(env_1.JWT_SECRET_KEY);
    const expiresIn = 2 * 60 * 60;
    return {
        expiresIn,
        token: (0, jsonwebtoken_1.sign)(dataStoredInToken, secretKey, { expiresIn }),
    };
}
function createCookie(tokenData) {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}; SameSite=None;  Secure`;
}
function logout(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const adminData = req.admin;
            if (!adminData) {
                return next(new CustomError_1.CustomError(400, "userData is empty"));
            }
            if (!adminData.username) {
                return next(new CustomError_1.CustomError(400, "userData is empty"));
            }
            const foundAdmin = yield admin_1.default.findOne({
                username: adminData.username,
            }, {
                username: 1,
            });
            if (!foundAdmin) {
                throw new CustomError_1.CustomError(409, `This email ${foundAdmin.username} was not found`);
            }
            res.setHeader("Set-Cookie", ["Authorization=; Max-age=0"]);
            res
                .status(200)
                .json({ success: true, data: foundAdmin, message: "adminloggedout" });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.logout = logout;
