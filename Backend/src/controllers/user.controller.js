import {
    createUserAccount,
    getAllUsers,
    toggleUserStatus,
    updateUserById
} from "../services/user.service.js";

export const createUser = async (req, res) => {
    try {
        const user = await createUserAccount(req.body);

        return res.status(201).json({
            success: true,
            message: "Usuario creado correctamente",
            user
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

export const getUsers = async (req, res) => {
    try {
        const users = await getAllUsers();

        return res.status(200).json({
            success: true,
            users
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const updateUserStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { activo } = req.body;

        const user = await toggleUserStatus(Number(id), activo);

        return res.status(200).json({
            success: true,
            message: "Estado del usuario actualizado",
            user
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await updateUserById(Number(id), req.body);

        return res.status(200).json({
            success: true,
            message: "Usuario actualizado correctamente",
            user
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};
