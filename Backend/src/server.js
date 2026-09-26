import app from "./app.js";
import pool from "./config/database.js";

const PORT = 3000;

async function waitForDatabase(maxAttempts = 20, delayMs = 2000) {
    for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
        try {
            const connection = await pool.getConnection();
            connection.release();
            console.log("MySQL conectado correctamente");
            return;
        } catch (error) {
            if (attempt === maxAttempts) {
                throw error;
            }

            console.log(`Esperando MySQL... intento ${attempt}/${maxAttempts}`);
            await new Promise((resolve) => setTimeout(resolve, delayMs));
        }
    }
}

async function startServer() {
    try {
        await waitForDatabase();

        app.listen(PORT, () => {
            console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Error al conectar con MySQL:", error);
        process.exit(1);
    }
}

startServer();