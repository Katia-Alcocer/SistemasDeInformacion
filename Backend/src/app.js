import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js";

dotenv.config();

const app = express();

app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        credentials: true
    })
);

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

app.use(cookieParser());

app.get("/api/test", (req, res) => {
    res.json({
        success: true,
        message: "Backend funcionando correctamente"
    });
});

app.use("/api/auth", authRoutes);

export default app;