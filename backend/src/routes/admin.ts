import { Router } from "express";
import { adminSignin, logout } from "../controllers/admin";
import { verifyAdminMiddleware } from "../validations/verifyAdminMiddleware";
import { addProduct, getProductFromId } from "../controllers/modProducts";
import multer from "multer";
const upload = multer();

const router = Router();

router.post("/signin", adminSignin);

router.use(verifyAdminMiddleware);

router.post("/logout", logout);
router.get("/product/id/:prodId", getProductFromId);
router.post("/product/upload", upload.any(), addProduct);

export default router;
