import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// Utilities
import { connectDB } from "./config/db.js";
import v1Routes from "./routes/v1/index.js";
import pathFinder from "./utils/pathfinder.js";

pathFinder();
const port = process.env.PORT || 4200;

// Connect DB
connectDB()

const app = express();

// mount middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// mount routes
app.use("/api/v1", v1Routes);

// Listen for request
app.listen(port, () => console.log(`Server runing on port: ${port}`))