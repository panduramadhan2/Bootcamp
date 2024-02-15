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
//filtering fiture
router.post("/expenses/filter");
router.post("/expenses-plans/filter");
router.post("/incomes/filter");
router.post("/user-transactions/filter");
router.post("/report/filter");

export default router;
