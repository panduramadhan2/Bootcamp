import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
// import { sequelize } from "../config/database.js"; // Adjust the path as needed

const ExpensePlan = sequelize.define(
  "ExpensePlan",
  {
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    paranoid: true, // Soft delete
  }
);

export default ExpensePlan;
