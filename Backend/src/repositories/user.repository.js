import pool from "../config/db.js";

export const findUserByEmail = async (correo) => {
    const [rows] = await pool.execute(
        `
        SELECT
            u.id_usuario,
            u.id_rol,
            u.nombre,
            u.apellido,
            u.correo,
            u.password,
            u.telefono,
            u.activo,
            r.nombre AS rol,
            r.descripcion AS rol_descripcion
        FROM usuarios u
        INNER JOIN roles r
            ON u.id_rol = r.id_rol
        WHERE u.correo = ?
        LIMIT 1
        `,
        [correo]
    );

    return rows[0] || null;
};

export const createUser = async ({
    id_rol,
    nombre,
    apellido,
    correo,
    password,
    telefono
}) => {
    const [result] = await pool.execute(
        `
        INSERT INTO usuarios
        (
            id_rol,
            nombre,
            apellido,
            correo,
            password,
            telefono,
            activo
        )
        VALUES (?, ?, ?, ?, ?, ?, TRUE)
        `,
        [id_rol, nombre, apellido, correo, password, telefono]
    );

    return {
        insertId: result.insertId
    };
};

export const findUserById = async (id_usuario) => {
    const [rows] = await pool.execute(
        `
        SELECT
            u.id_usuario,
            u.id_rol,
            u.nombre,
            u.apellido,
            u.correo,
            u.telefono,
            u.activo,
            r.nombre AS rol,
            r.descripcion AS rol_descripcion
        FROM usuarios u
        INNER JOIN roles r
            ON u.id_rol = r.id_rol
        WHERE u.id_usuario = ?
        LIMIT 1
        `,
        [id_usuario]
    );

    return rows[0] || null;
};