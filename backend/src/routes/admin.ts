import { Router } from "express";
import { adminSignin, logout } from "../controllers/admin";
import { verifyAdminMiddleware } from "../validations/verifyAdminMiddleware";
import { getProductFromId } from "../controllers/modProducts";

const router = Router();

router.post("/signin", adminSignin);
router.post("/logout", verifyAdminMiddleware, logout);
router.get("/id/:prodId", getProductFromId);

export default router;
