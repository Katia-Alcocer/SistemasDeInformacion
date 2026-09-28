import dotenv from "dotenv";
import app from "./app.js";
import pool from "./config/db.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

const startServer = async () => {

    try {

        const connection = await pool.getConnection();

        console.log("✅ MySQL conectado");

        connection.release();

        app.listen(PORT, () => {
            console.log(
                `🚀 Backend ejecutándose en http://localhost:${PORT}`
            );
        });

    } catch (error) {

        console.error(
            "❌ Error conectando a MySQL:",
            error.message
        );

        process.exit(1);
    }
};

startServer();