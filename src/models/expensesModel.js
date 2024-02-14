// models/Expense.js
import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Expense = sequelize.define(
  "Expense",
  {
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    paranoid: true, // Soft delete
  }
);

export default Expense;
