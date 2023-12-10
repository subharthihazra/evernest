"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = require("../config/env");
const mongoose_1 = __importDefault(require("mongoose"));
function connectDB() {
    return mongoose_1.default.connect(String(env_1.MONGO_URI));
}
exports.default = connectDB;
