import ExpensePlan from "../models/expense_plans";
import Expense from "../models/expensesModel";
import Income from "../models/incomesModel";
import Report from "../models/report";
import UserTransaction from "../models/user_transactions";

export const Expenses = async (req, res) => {
  try {
    const { startDate, endDate } = req.body;

    // Validate input
    if (!startDate || !endDate) {
      return res
        .status(400)
        .json({ error: "Invalid input. startDate and endDate are required." });
    }

    // Filter expenses
    const filteredExpenses = await Expense.findAll({
      where: {
        date: {
          [sequelize.Op.between]: [startDate, endDate],
        },
      },
    });

    res.json(filteredExpenses);
  } catch (error) {
    console.error("Error filtering expenses:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

export const ExpensesPlans = async (req, res) => {
  try {
    const { startDate, endDate } = req.body;

    // Validate input
    if (!startDate || !endDate) {
      return res
        .status(400)
        .json({ error: "Invalid input. startDate and endDate are required." });
    }

    // Filter expense plans
    const filteredExpensePlans = await ExpensePlan.findAll({
      where: {
        start_date: {
          [sequelize.Op.between]: [startDate, endDate],
        },
      },
    });

    res.json(filteredExpensePlans);
  } catch (error) {
    console.error("Error filtering expense plans:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

export const Incomes = async (req, res) => {
  try {
    const { startDate, endDate } = req.body;

    // Validate input
    if (!startDate || !endDate) {
      return res
        .status(400)
        .json({ error: "Invalid input. startDate and endDate are required." });
    }

    // Filter incomes
    const filteredIncomes = await Income.findAll({
      where: {
        date: {
          [sequelize.Op.between]: [startDate, endDate],
        },
      },
    });

    res.json(filteredIncomes);
  } catch (error) {
    console.error("Error filtering incomes:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

export const UserTransactions = async (req, res) => {
  try {
    const { startDate, endDate } = req.body;

    // Validate input
    if (!startDate || !endDate) {
      return res
        .status(400)
        .json({ error: "Invalid input. startDate and endDate are required." });
    }

    // Filter user transactions
    const filteredUserTransactions = await UserTransaction.findAll({
      where: {
        date: {
          [sequelize.Op.between]: [startDate, endDate],
        },
      },
    });

    res.json(filteredUserTransactions);
  } catch (error) {
    console.error("Error filtering user transactions:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

export const ReportUser = async (req, res) => {
  try {
    const { startDate, endDate } = req.body;

    // Validate input
    if (!startDate || !endDate) {
      return res
        .status(400)
        .json({ error: "Invalid input. startDate and endDate are required." });
    }

    // Filter reports
    const filteredReports = await Report.findAll({
      where: {
        date: {
          [sequelize.Op.between]: [startDate, endDate],
        },
      },
    });

    res.json(filteredReports);
  } catch (error) {
    console.error("Error filtering reports:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};
