import bcrypt from "bcryptjs";
import {
    findUserByEmail,
    findUserById
} from "../repositories/user.repository.js";
import { generateToken } from "../utils/jwt.js";

export const loginUser = async (correo, password) => {
    const user = await findUserByEmail(correo);

    if (!user) {
        throw new Error("Credenciales inválidas");
    }

    if (!user.activo) {
        throw new Error("El usuario está desactivado");
    }

    const passwordCorrecta = await bcrypt.compare(
        password,
        user.password
    );

    if (!passwordCorrecta) {
        throw new Error("Credenciales inválidas");
    }

    const token = generateToken(user);

    const userResponse = {
        id_usuario: user.id_usuario,
        id_rol: user.id_rol,
        nombre: user.nombre,
        apellido: user.apellido,
        correo: user.correo,
        telefono: user.telefono,
        rol: user.rol,
        rol_descripcion: user.rol_descripcion
    };

    return {
        user: userResponse,
        token
    };
};

export const getAuthenticatedUser = async (id_usuario) => {
    const user = await findUserById(id_usuario);

    if (!user) {
        throw new Error("Usuario no encontrado");
    }

    if (!user.activo) {
        throw new Error("El usuario está desactivado");
    }

    return {
        id_usuario: user.id_usuario,
        id_rol: user.id_rol,
        nombre: user.nombre,
        apellido: user.apellido,
        correo: user.correo,
        telefono: user.telefono,
        rol: user.rol,
        rol_descripcion: user.rol_descripcion
    };
};