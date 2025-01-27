import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// Utilities
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/userAuthRoutes.js";
import { courseRoutes } from "./routes/courseRoutes.js";


dotenv.config();
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
app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoutes);

// Listen for request
app.listen(port, () => console.log(`Server runing on port: ${port}`))