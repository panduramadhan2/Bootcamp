// models/Report.js
import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Report = sequelize.define(
  "Report",
  {
    report_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    report_data: {
      type: DataTypes.TEXT,
    },
    generated_at: {
      type: DataTypes.DATE,
    },
  },
  {
    paranoid: true, // Soft delete
  }
);

export default Report;
