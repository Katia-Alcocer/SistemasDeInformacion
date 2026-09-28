import {
    registerUser,
    loginUser,
    getAuthenticatedUser
} from "../services/auth.service.js";
import {
    registerSchema,
    loginSchema
} from "../validators/auth.validator.js";

export const register = async (req, res) => {
    try {
        const { error } = registerSchema.validate(req.body);

        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message
            });
        }

        const user = await registerUser(req.body);

        return res.status(201).json({
            success: true,
            message: "Usuario registrado correctamente",
            user
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

export const login = async (req, res) => {
    try {
        const { error } = loginSchema.validate(req.body);

        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message
            });
        }

        const { correo, password } = req.body;

        const result = await loginUser(correo, password);

        res.cookie("access_token", result.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production"
                ? "none"
                : "lax",
            maxAge: 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
            success: true,
            message: "Inicio de sesión exitoso",
            user: result.user
        });

    } catch (error) {

        return res.status(401).json({
            success: false,
            message: error.message
        });
    }
};

export const me = async (req, res) => {
    try {

        const user = await getAuthenticatedUser(
            req.user.id_usuario
        );

        return res.status(200).json({
            success: true,
            user
        });

    } catch (error) {

        return res.status(401).json({
            success: false,
            message: error.message
        });
    }
};

export const logout = async (req, res) => {

    res.clearCookie("access_token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production"
            ? "none"
            : "lax"
    });

    return res.status(200).json({
        success: true,
        message: "Sesión cerrada correctamente"
    });
};