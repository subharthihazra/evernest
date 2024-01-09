"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const adminSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
    },
    password: {
        type: String,
        required: true,
    },
});
const adminModel = (0, mongoose_1.model)("Admin", adminSchema);
exports.default = adminModel;
