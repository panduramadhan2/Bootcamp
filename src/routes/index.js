import express from "express";
import { Login, Register } from "../controllers/registration.js";
import { createPin } from "../controllers/pin.js";
import { forgotPassword } from "../controllers/forgotPassword.js";
import { resetPassword } from "../controllers/passwordReset.js";
import { ExportDocument } from "../controllers/exportDocument.js";
import {
  Expenses,
  ExpensesPlans,
  Incomes,
  ReportUser,
  UserTransactions,
} from "../controllers/filter.js";

const router = express.Router();

router.post("/register", Register);
router.post("/login", Login);
router.post("/create-pin", createPin);
router.post("/request-reset", forgotPassword);
router.post("/reset-password", resetPassword);
//filtering fiture
router.post("/expenses/filter", Expenses);
router.post("/expenses-plans/filter", ExpensesPlans);
router.post("/incomes/filter", Incomes);
router.post("/user-transactions/filter", UserTransactions);
router.post("/report/filter", ReportUser);
//eport document
router.post("/export", ExportDocument);

export default router;
