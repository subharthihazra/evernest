"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_SECRET_KEY = exports.MONGO_URI = exports.SERVER_PORT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
_a = process.env, exports.SERVER_PORT = _a.SERVER_PORT, exports.MONGO_URI = _a.MONGO_URI, exports.JWT_SECRET_KEY = _a.JWT_SECRET_KEY;
