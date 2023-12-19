import express from "express";
const router = express.Router();

// import createError from "#utils/createError.js";
import { sendMail, sendNotify } from "#controllers/utils.js";
import { authMid } from "#middleware/auth.js";

router.post("/send/notify", authMid, sendNotify);
router.post("/send/mail", authMid, sendMail);

router.get("/", (req, res) => {
    const uptime = () => {
        if (process.uptime() < 60) {
            return `${process.uptime().toFixed(2)}s`;
        } else if (process.uptime() < 3600) {
            return `${(process.uptime() / 60).toFixed(2)}m`;
        }
        return `${(process.uptime() / 3600).toFixed(2)}h`;
    };
    return res.status(200).json({
        message: "API GhuniNew",
        ip: req.ip || req.ips,
        protocol: req.protocol,
        uptime: uptime().toString(),
        user: req.user && req.user,
    });
});

export default router;
