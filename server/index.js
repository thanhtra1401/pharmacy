import express from "express";
import "dotenv/config";
import { connectDB } from "./src/config/connectDB.js";
import rootRouter from "./src/routers/index.js";
import errorHandler from "./src/middlewares/errorHandler.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

const PORT = process.env.PORT || 8888;
const app = express();

const publicPathDirectory = path.join(__dirname, "./public");
app.use("/public", express.static(publicPathDirectory));

const corsOptions = {
  origin: true, //included origin as true
  credentials: true, //included credentials as true
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/api", rootRouter);

app.use(errorHandler);

app.listen(PORT, async () => {
  console.log(`App is running on port ${PORT}`);
  connectDB();
});
