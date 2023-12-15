import express from "express";
const router = express.Router();

// import createError from "#utils/createError.js";

router.get("/", (req, res) => {
    return res.status(200).json({
        message: "API GhuniNew",
        ip: req.ip,
        protocol: req.protocol,
        uptime: Math.floor(process.uptime().toFixed(0)),
        cookie: req.cookies || null,
    });
});

export default router;
