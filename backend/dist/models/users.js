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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const hash_1 = require("../encrypt/hash");
const auth_1 = require("../validations/auth");
const userSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        validate: {
            validator: auth_1.validateEmail,
            message: () => "Not a valid email",
        },
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: auth_1.validatePassword,
            message: () => "Password not matching the criteria",
        },
    },
    name: {
        type: String,
        required: true,
        validate: {
            validator: auth_1.validateName,
            message: () => "Name not matching the criteria",
        },
    },
    isEmailVerified: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: () => Date.now(),
    },
});
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            this.name = this.name.trim();
            this.email = this.email.trim();
            this.password = yield (0, hash_1.hashPassword)(this.password);
            next();
        }
        catch (err) {
            throw err;
        }
    });
});
userSchema.statics.validateUserCredentials = function (email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!((0, auth_1.validateEmail)(email) && (0, auth_1.validatePassword)(password))) {
            return null;
        }
        const foundUser = yield this.findOne({ email }, { email: 1, password: 1, name: 1 });
        // console.log("pp", foundUser);
        if (!foundUser) {
            return null;
        }
        if (!(yield (0, hash_1.comparePasswords)(password, foundUser.password))) {
            return null;
        }
        return { email: foundUser.email, _id: foundUser._id, name: foundUser.name };
    });
};
const userModel = (0, mongoose_1.model)("User", userSchema);
exports.default = userModel;
