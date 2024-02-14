import express from "express";
import { Login, Register } from "../controllers/registration.js";
import { createPin } from "../controllers/pin.js";
import { forgotPassword } from "../controllers/forgotPassword.js";
import { resetPassword } from "../controllers/passwordReset.js";

const router = express.Router();

router.post("/register", Register);
router.post("/login", Login);
router.post("/create-pin", createPin);
router.post("/request-reset", forgotPassword);
router.post("/reset-password", resetPassword);
// router.post("/activate", Activation);

export default router;
