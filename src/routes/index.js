import express from "express";
import { Login, Register } from "../controllers/registration.js";

const router = express.Router();

router.post("/register", Register);
router.post("/login", Login);
// router.post("/activate", Activation);

export default router;
