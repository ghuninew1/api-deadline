import User from "#models/UserFB.js";
import bcrypt from "bcryptjs";
import createError from "#utils/createError.js";
import jwt from "jsonwebtoken";

const refreshSecret = process.env.JWT_REFRESH_TOKEN;

const authFB = async (req, res, next) => {
    try {
        const data = req.body;
        if (!data) return next(createError(400, "Please enter all fields"));
        const foundUser = await User.findOneAndUpdate(
            { uid: data.uid },
            { new: true }
        );

        if (!foundUser) {
            const payload = {
                username: data.username,
                roles: 100,
            };

            const newRefreshToken = jwt.sign(payload, refreshSecret, {
                expiresIn: "1d",
            });

            const newUser = new User({
                username: data.username,
                uid: data.uid,
                img: data.img,
                expires: Date.now() + 24 * 60 * 60 * 1000, // 1 day
                refreshToken: newRefreshToken,
                roles: 100,
            });

            await newUser.save();

            // Creates Secure Cookie with refresh token
            res.cookie("jwt", newRefreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: "None",
                maxAge: 24 * 60 * 60 * 1000, // 1 day
            });
            res.status(201).json({
                username: foundUser.username,
                roles: foundUser.roles,
                img: foundUser.img,
                expires: foundUser.expires,
                refreshToken: foundUser.refreshToken,
            });
        } else {
            if (foundUser.expires < Date.now()) {
                const payload = {
                    username: foundUser.username,
                    roles: foundUser.roles,
                };

                const newRefreshToken = jwt.sign(payload, refreshSecret, {
                    expiresIn: "1d",
                });

                foundUser.refreshToken = newRefreshToken;
                foundUser.expires = Date.now() + 24 * 60 * 60 * 1000;

                await foundUser.save();

                res.cookie("jwt", newRefreshToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: "None",
                    maxAge: 24 * 60 * 60 * 1000, // 1 day
                });
                res.status(200).json({
                    username: foundUser.username,
                    roles: foundUser.roles,
                    img: foundUser.img,
                    expires: foundUser.expires,
                    refreshToken: foundUser.refreshToken,
                });
            } else {
                res.cookie("jwt", foundUser.refreshToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: "None",
                    maxAge: 24 * 60 * 60 * 1000, // 1 day
                });
                res.status(200).json({
                    username: foundUser.username,
                    roles: foundUser.roles,
                    img: foundUser.img,
                    expires: foundUser.expires,
                    refreshToken: foundUser.refreshToken,
                });
            }
        }
    } catch (err) {
        next(err);
    }
};

export default authLine;
