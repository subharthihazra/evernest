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
const jsonwebtoken_1 = require("jsonwebtoken");
const env_1 = require("../config/env");
const users_1 = __importDefault(require("../models/users"));
const CustomError_1 = require("../errorhandlers/CustomError");
function verifyUserMidddleware(req, res, next) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const Authorization = req.cookies["Authorization"] ||
                ((_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.split("Bearer ")[1]);
            if (!Authorization) {
                return next(new CustomError_1.CustomError(404, "Authentication token missing"));
            }
            const secretKey = String(env_1.JWT_SECRET_KEY);
            const verificationResponse = (yield (0, jsonwebtoken_1.verify)(Authorization, secretKey));
            if (!(((_b = verificationResponse._id) === null || _b === void 0 ? void 0 : _b.trim()) && ((_c = verificationResponse.email) === null || _c === void 0 ? void 0 : _c.trim()))) {
                return next(new CustomError_1.CustomError(401, "Wrong authentication token"));
            }
            const foundUser = yield users_1.default.findOne({
                _id: verificationResponse._id,
                email: verificationResponse.email,
            }, {
                _id: 1,
                email: 1,
                name: 1,
            });
            if (!foundUser) {
                return next(new CustomError_1.CustomError(401, "Wrong authentication token"));
            }
            req.user = foundUser;
            next();
        }
        catch (error) {
            next(new CustomError_1.CustomError(401, "Wrong authentication token"));
        }
    });
}
exports.default = verifyUserMidddleware;
