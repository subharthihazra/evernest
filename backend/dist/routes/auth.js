"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const verifyUserMiddleware_1 = require("../validations/verifyUserMiddleware");
const router = (0, express_1.Router)();
router.post("/signup", verifyUserMiddleware_1.isUserMiddleware, auth_1.signup);
router.post("/signin", verifyUserMiddleware_1.isUserMiddleware, auth_1.signin);
router.post("/isauth", verifyUserMiddleware_1.verifyUserMiddleware, auth_1.isAuth);
router.post("/logout", verifyUserMiddleware_1.verifyUserMiddleware, auth_1.logout);
exports.default = router;
