import bcrypt from "bcryptjs";
import pool from "./src/config/db.js";

const crearUsuario = async () => {

    try {

        const password = "123456";

        const passwordHash = await bcrypt.hash(
            password,
            10
        );

        await pool.execute(
            `
            INSERT INTO usuarios
            (
                id_rol,
                nombre,
                apellido,
                correo,
                password,
                telefono
            )
            VALUES (?, ?, ?, ?, ?, ?)
            `,
            [
                1,
                "Katia",
                "Alcocer",
                "admin@tienda.com",
                passwordHash,
                "4610000000"
            ]
        );

        console.log("✅ Usuario creado correctamente");

    } catch (error) {

        console.error(
            "❌ Error:",
            error.message
        );

    } finally {

        await pool.end();

    }
};

crearUsuario();