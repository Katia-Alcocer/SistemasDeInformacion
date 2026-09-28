import bcrypt from "bcryptjs";
import pool from "../config/db.js";

export const createUserAccount = async ({
    nombre,
    apellido,
    correo,
    password,
    telefono,
    id_rol
}) => {
    if (!nombre || !apellido || !correo || !password || !telefono || !id_rol) {
        throw new Error("Todos los campos son obligatorios");
    }

    const [existing] = await pool.execute(
        "SELECT id_usuario FROM usuarios WHERE correo = ? LIMIT 1",
        [correo]
    );

    if (existing.length > 0) {
        throw new Error("El correo ya está registrado");
    }

    const passwordHash = await bcrypt.hash(password, 10);

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
        [id_rol, nombre, apellido, correo, passwordHash, telefono]
    );

    return {
        id_usuario: result.insertId,
        nombre,
        apellido,
        correo,
        telefono,
        id_rol,
        activo: true
    };
};

export const getAllUsers = async () => {
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
        INNER JOIN roles r ON u.id_rol = r.id_rol
        ORDER BY u.id_usuario DESC
        `
    );

    return rows;
};

export const toggleUserStatus = async (id_usuario, activo) => {
    if (typeof activo !== "boolean") {
        throw new Error("El estado activo debe ser booleano");
    }

    const [result] = await pool.execute(
        `
        UPDATE usuarios
        SET activo = ?
        WHERE id_usuario = ?
        `,
        [activo, id_usuario]
    );

    if (result.affectedRows === 0) {
        throw new Error("Usuario no encontrado");
    }

    return {
        id_usuario,
        activo
    };
};

export const updateUserById = async (id_usuario, data) => {
    const { nombre, apellido, correo, telefono, id_rol } = data;

    if (!nombre || !apellido || !correo || !telefono || !id_rol) {
        throw new Error("Todos los datos del usuario son obligatorios");
    }

    const [result] = await pool.execute(
        `
        UPDATE usuarios
        SET
            nombre = ?,
            apellido = ?,
            correo = ?,
            telefono = ?,
            id_rol = ?
        WHERE id_usuario = ?
        `,
        [nombre, apellido, correo, telefono, id_rol, id_usuario]
    );

    if (result.affectedRows === 0) {
        throw new Error("Usuario no encontrado");
    }

    return {
        id_usuario,
        nombre,
        apellido,
        correo,
        telefono,
        id_rol
    };
};
