// Your endpoint file (e.g., exportController.js)

import express from "express";
import {
  Expense,
  ExpensePlan,
  Income,
  UserTransaction,
  Report,
} from "../models"; // Assuming you have exported your models appropriately
import { exportData } from "../utils/exportUtils"; // Adjust the path based on your project structure

// const router = express.Router();

export const ExportDocument = async (req, res) => {
  const { type, startDate, endDate } = req.body;

  try {
    if (!type || !startDate || !endDate) {
      return res.status(400).json({
        error:
          "Invalid input. 'type', 'startDate', and 'endDate' are required.",
      });
    }

    let model;
    let title;
    let fileName;
    let sheetName;

    // Determine the model based on the 'type' parameter
    switch (type) {
      case "expenses":
        model = Expense;
        title = "Expenses";
        fileName = "expenses";
        sheetName = "ExpensesSheet";
        break;
      case "expensePlans":
        model = ExpensePlan;
        title = "Expense Plans";
        fileName = "expense-plans";
        sheetName = "ExpensePlansSheet";
        break;
      case "incomes":
        model = Income;
        title = "Incomes";
        fileName = "incomes";
        sheetName = "IncomesSheet";
        break;
      case "userTransactions":
        model = UserTransaction;
        title = "User Transactions";
        fileName = "user-transactions";
        sheetName = "UserTransactionsSheet";
        break;
      case "reports":
        model = Report;
        title = "Reports";
        fileName = "reports";
        sheetName = "ReportsSheet";
        break;
      default:
        return res.status(400).json({
          error:
            "Invalid 'type'. Supported types: expenses, expensePlans, incomes, userTransactions, reports.",
        });
    }

    // Call the exportData function with the determined parameters
    await exportData(req, res, model, title, fileName, sheetName);
  } catch (error) {
    console.error("Error exporting data:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};
