import createError from "#utils/createError.js";
import jwt from "jsonwebtoken";

const refreshSecret = process.env.JWT_REFRESH_TOKEN;

export const authMid = (req, res, next) => {
    const token = req.headers["authorization"] || req.cookies.Authorization;

    const accessToken = token && token.split(" ")[1];
    if (!accessToken) {
        return next(createError(401, "Access Denied. No token provided."));
    }
    try {
        jwt.verify(accessToken, refreshSecret, (err, decoded) => {
            if (err) {
                return next(createError(403, "Invalid Token"));
            }
            req.user = decoded;
            next();
        });
    } catch (err) {
        next(createError(400, "Invalid Token"));
    }
};
