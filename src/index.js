import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";

import { sequelize } from "./config/database.js";
import synchronizeDatabase from "./config/synchronizeDatabase.js";
import limiter from "./middleware/authLimiter.js";
import router from "./routes/index.js";

dotenv.config();
const app = express();

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Database Connected...");
    await synchronizeDatabase();
  } catch (error) {
    console.log(error);
  }

  app.use(cors({ origin: "http://localhost:3000", credentials: true }));
  app.use(cookieParser());
  app.use(express.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  // Apply the rate limiter middleware globally
  app.use(limiter);
  app.use(router);

  app.listen(5000, () => console.log("Server running at port 5000"));
})();

export default app;
