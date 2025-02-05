import express from "express";
import { dbConnection } from "./Database/dbConnection.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import userRoutes from "./Routes/userRoutes.js";  // Import user routes
import adminRoutes from "./Routes/adminRoutes.js";  // Import admin routes
import residentRoutes from "./Routes/residentRoutes.js";  // Import resident routes

const app = express();
config({ path: "./config/config.env" });


const PORT = process.env.PORT || 5000;

// Enable CORS
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to the database
dbConnection();

// Use the routes
app.use("/api/users", userRoutes);  // User-related routes
app.use("/api/admin", adminRoutes);  // Admin-related routes
app.use("/api/resident", residentRoutes);  // Resident-related routes

// Export the app for use in server setup
export default app;
