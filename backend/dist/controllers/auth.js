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
exports.logout = exports.signup = exports.signin = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const users_1 = __importDefault(require("../models/users"));
const CustomError_1 = require("../errorhandlers/CustomError");
const env_1 = require("../config/env");
function signin(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let { email, password } = req.body;
            if (!(email && password)) {
                return next(new CustomError_1.CustomError(400, "Not enough data provided"));
            }
            const foundUser = yield users_1.default.validateUserCredentials(email, password);
            if (!foundUser) {
                return next(new CustomError_1.CustomError(401, "Invalid email or password"));
            }
            const tokenData = createToken(foundUser);
            const cookie = createCookie(tokenData);
            res.setHeader("Set-Cookie", [cookie]);
            res
                .status(201)
                .json({ success: true, data: foundUser, message: "loggedin" });
        }
        catch (err) {
            next(err);
        }
    });
}
exports.signin = signin;
function signup(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password, name, } = req.body;
            if (!(email && password && name)) {
                return next(new CustomError_1.CustomError(400, "Not enough data provided"));
            }
            console.log("New User:", email);
            try {
                const createdUser = yield users_1.default.create({
                    email,
                    password,
                    name,
                });
                res.status(201).json({
                    success: true,
                    email: createdUser.email,
                    name: createdUser.name,
                });
            }
            catch (err) {
                console.log("ERROR: ", err.code, err.name);
                if (err.name === "MongoServerError" && err.code === 11000) {
                    return next(new CustomError_1.CustomError(400, "Email is already used"));
                }
                else {
                    return next(new CustomError_1.CustomError(400, err.message));
                }
            }
        }
        catch (err) {
            next(err);
        }
    });
}
exports.signup = signup;
function createToken(user) {
    // console.log(user);
    const dataStoredInToken = {
        _id: user._id,
        email: user.email,
    };
    const secretKey = String(env_1.JWT_SECRET_KEY);
    const expiresIn = 60 * 60;
    return {
        expiresIn,
        token: (0, jsonwebtoken_1.sign)(dataStoredInToken, secretKey, { expiresIn }),
    };
}
function createCookie(tokenData) {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
}
function logout(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userData = req.user;
            if (!userData) {
                return next(new CustomError_1.CustomError(400, "userData is empty"));
            }
            if (!(userData._id && userData.email)) {
                return next(new CustomError_1.CustomError(400, "userData is empty"));
            }
            const foundUser = yield users_1.default.findOne({
                _id: userData._id,
                email: userData.email,
            }, {
                _id: 1,
                email: 1,
            });
            if (!foundUser) {
                throw new CustomError_1.CustomError(409, `This email ${userData.email} was not found`);
            }
            res.setHeader("Set-Cookie", ["Authorization=; Max-age=0"]);
            res
                .status(200)
                .json({ success: true, data: foundUser, message: "loggedout" });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.logout = logout;
