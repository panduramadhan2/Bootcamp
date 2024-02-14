import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("bootcamp", "root", "root", {
  host: "localhost",
  dialect: "mysql",
  define: {
    timestamps: true,
    paranoid: true, // Soft delete
  },
});
