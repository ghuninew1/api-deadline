import express from "express";
const router = express.Router();

import { authMid } from "#middleware/auth.js";

import {
    getUser,
    getAllUsers,
    getUserbyId,
    updateUserbyId,
    deleteUserbyId,
    createUser,
    editIsUser,
} from "#controllers/user.js";

router.get("/user/user", authMid, getUser);
router.get("/user/users", authMid, getAllUsers);
router.get("/user/user/:id", authMid, getUserbyId);
router.put("/user/user/:id", authMid, updateUserbyId);
router.delete("/user/user/:id", authMid, deleteUserbyId);
router.post("/user/user", authMid, createUser);
router.put("/user/user/edit", authMid, editIsUser);

export default router;
