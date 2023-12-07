import express, { Express } from "express";
import { signup } from "../controllers/auth";

const router = express.Router();

router.post("/signup", signup);

export default router;
