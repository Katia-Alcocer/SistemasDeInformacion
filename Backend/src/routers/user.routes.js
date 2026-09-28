import express from "express";

import {
    createUser,
    getUsers,
    updateUserStatus,
    updateUser
} from "../controllers/user.controller.js";

import { authenticate } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(authenticate);

router.post("/", createUser);
router.get("/", getUsers);
router.patch("/:id/estado", updateUserStatus);
router.put("/:id", updateUser);

export default router;
