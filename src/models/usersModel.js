import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const User = sequelize.define(
  "User",
  {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pin: {
      type: DataTypes.STRING,
      validate: {
        isNumeric: true,
        len: [8, 8],
      },
    },
    registrationCode: {
      type: DataTypes.STRING,
    },
  },
  {
    paranoid: true, // Soft delete
  }
);

export default User;
