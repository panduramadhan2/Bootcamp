// synchronizeDatabase.js
import { sequelize } from "../config/database.js";
import User from "../models/usersModel.js";
import ExpensePlan from "../models/expense_plans.js";
import UserTransaction from "../models/user_transactions.js";
import Notification from "../models/notifications.js";
import Expense from "../models/expensesModel.js";
import Income from "../models/incomesModel.js";
import Report from "../models/report.js";

const synchronizeDatabase = async () => {
  try {
    // Define model relationships
    User.hasMany(Income);
    User.hasMany(Expense);
    User.hasMany(ExpensePlan);
    User.hasMany(UserTransaction);
    User.hasMany(Report);
    User.hasMany(Notification);

    // Synchronize the database
    await sequelize.sync({ force: true });
    console.log("Database synchronized successfully");
  } catch (error) {
    console.error("Error synchronizing database:", error);
    throw error; // Rethrow the error to handle it outside
  }
};

export default synchronizeDatabase;
