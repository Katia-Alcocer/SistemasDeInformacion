import jwt from "jsonwebtoken";

export const authenticate = (req, res, next) => {

    try {

        const token = req.cookies.access_token;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "No autenticado"
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decoded;

        next();

    } catch (error) {

        return res.status(401).json({
            success: false,
            message: "Sesión inválida o expirada"
        });
    }
};