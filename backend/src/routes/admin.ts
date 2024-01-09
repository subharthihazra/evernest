import { Router } from "express";
import { adminSignin, logout } from "../controllers/admin";
import { verifyAdminMiddleware } from "../validations/verifyAdminMiddleware";

const router = Router();

router.post("/signin", adminSignin);
router.post("/logout", verifyAdminMiddleware, logout);

export default router;
