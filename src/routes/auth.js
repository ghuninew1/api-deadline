import express from "express";
const router = express.Router();

import { authMid } from "#middleware/auth.js";
import {
    handleLogin,
    handleLogout,
    handleRegister,
    authLine,
} from "#controllers/auth/index.js";

router.post("/auth/login", handleLogin);
router.post("/auth/register", handleRegister);
router.get("/auth/logout", handleLogout);
router.post("/auth/loginline", authLine);

export default router;
