"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_1 = require("../controllers/admin");
const verifyAdminMiddleware_1 = require("../validations/verifyAdminMiddleware");
const router = (0, express_1.Router)();
router.post("/signin", admin_1.adminSignin);
router.post("/logout", verifyAdminMiddleware_1.verifyAdminMiddleware, admin_1.logout);
exports.default = router;
