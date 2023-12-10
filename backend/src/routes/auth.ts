import { Express, Router } from "express";
import { signup, signin, logout } from "../controllers/auth";
import verifyUserMidddleware from "../validations/verifyUserMidddleware";

const router = Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.delete("/logout", verifyUserMidddleware, logout);

export default router;
