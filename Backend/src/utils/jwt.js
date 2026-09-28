import jwt from "jsonwebtoken";

export const generateToken = (user) => {
    return jwt.sign(
        {
            id_usuario: user.id_usuario,
            id_rol: user.id_rol,
            rol: user.rol,
            correo: user.correo
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN || "1d"
        }
    );
};