import express from "express";
import { dbConnection } from "./Database/dbConnection.js";

import { config } from "dotenv";
import cookieParser from "cookie-parser";

const app = express();
config({path: "./config/config.env"});
const PORT = process.env.PORT || 5000;
import cors from "cors";

app.use(
    cors({
        origin: [process.env.FRONTEND_URL],
        method: ["GET", "POST", "DELETE", "PUT"],
        credentials: true,
    })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dbConnection();


export default app;