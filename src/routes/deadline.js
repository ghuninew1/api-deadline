import express from "express";
const router = express.Router();

import { authMid } from "#middleware/auth.js";
import {
    findAll,
    findOne,
    findById,
    createByName,
    updateByid,
    deleteByid,
    deleteAll,
} from "#controllers/deadline.js";

router.get("/api", findAll);
router.get("/api/:name", findOne);
router.get("/api/:name/:id", authMid, findById);
router.post("/api/:name", authMid, createByName);
router.put("/api/:name/:id", authMid, updateByid);
router.delete("/api/:name/:id", authMid, deleteByid);
router.delete("/del/:name", authMid, deleteAll);

export default router;
