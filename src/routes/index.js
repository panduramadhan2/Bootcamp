import express from "express";
import { Activation, Register } from "../controllers/registration.js";

const router = express.Router();

router.post("/register", Register);
router.post("/activate", Activation);

export default router;
