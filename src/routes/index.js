import express from "express";
import { Login, Register } from "../controllers/registration.js";
import { createPin } from "../controllers/pin.js";

const router = express.Router();

router.post("/register", Register);
router.post("/login", Login);
router.post("/create-pin", createPin);
// router.post("/activate", Activation);

export default router;
