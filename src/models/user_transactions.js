// models/UserTransaction.js
import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const UserTransaction = sequelize.define(
  "UserTransaction",
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

export default UserTransaction;
