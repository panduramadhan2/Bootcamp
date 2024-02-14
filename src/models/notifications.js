// models/Notification.js
import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Notification = sequelize.define(
  "Notification",
  {
    notification_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
    },
  },
  {
    paranoid: true, // Soft delete
  }
);

export default Notification;
