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
exports.verifyAdminMiddleware = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const env_1 = require("../config/env");
const CustomError_1 = require("../errorhandlers/CustomError");
const admin_1 = __importDefault(require("../models/admin"));
function verifyAdminMiddleware(req, res, next) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const Authorization = req.cookies["Authorization"] ||
                ((_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.split("Bearer ")[1]);
            if (!Authorization) {
                return next(new CustomError_1.CustomError(404, "Authentication token missing"));
            }
            const secretKey = String(env_1.JWT_SECRET_KEY);
            const verificationResponse = (yield (0, jsonwebtoken_1.verify)(Authorization, secretKey));
            if (!((_b = verificationResponse.username) === null || _b === void 0 ? void 0 : _b.trim())) {
                return next(new CustomError_1.CustomError(401, "Wrong authentication token"));
            }
            const foundAdmin = yield admin_1.default.findOne({
                username: verificationResponse.username,
            }, {
                username: 1,
            });
            if (!foundAdmin) {
                return next(new CustomError_1.CustomError(401, "Wrong authentication token"));
            }
            req.admin = foundAdmin;
            next();
        }
        catch (error) {
            next(new CustomError_1.CustomError(401, "Wrong authentication token"));
        }
    });
}
exports.verifyAdminMiddleware = verifyAdminMiddleware;
