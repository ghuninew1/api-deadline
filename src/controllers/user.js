import createError from "#utils/createError.js";
import jwt from "jsonwebtoken";
import User from "#models/UserLine.js";

const refreshSecret = process.env.JWT_REFRESH_TOKEN;

export const getUser = async (req, res, next) => {
    try {
        const Token = req.headers.authorization.split(" ")[1];
        if (!Token) {
            return next(createError(401, "Access denied No Token"));
        }
        const userCheck = jwt.decode(Token, refreshSecret);

        if (userCheck.exp < Date.now() / 1000) {
            return next(createError(403, "Access denied Token Expired"));
        } else {
            const dbUsers = await User.findOne({
                username: userCheck.username,
            }).select("-password");

            return res.status(200).json(dbUsers);
        }
    } catch (err) {
        next(err);
    }
};

export const getAllUsers = async (req, res, next) => {
    try {
        const dbUsers = await User.find().select("-password");
        return dbUsers
            ? res.status(200).json(dbUsers)
            : next(createError(404, "No Users Found"));
    } catch (err) {
        next(err);
    }
};

export const createUser = async (req, res, next) => {
    try {
        const { username, password, email } = req.body;
        if (!username || !password || !email) {
            return next(createError(401, "Username, Password, Email Required"));
        }

        const dbUser = await User.create({
            username,
            password,
            email,
        });

        return dbUser
            ? res.status(200).json({ message: "User Created" })
            : next(createError(404, "No Users Found"));
    } catch (err) {
        next(err);
    }
};

export const editIsUser = async (req, res, next) => {
    try {
        const tokenLocal =
            req.headers["authorization"] || req.cookies.Authorization;
        const Token = tokenLocal && tokenLocal.split(" ")[1];
        if (!Token) {
            return next(createError(401, "Access denied No Token"));
        }
        const userCheck = jwt.decode(Token, refreshSecret);

        if (userCheck.exp < Date.now() / 1000) {
            return next(createError(403, "Access denied Token Expired"));
        } else {
            const dbUser = await User.findOneAndUpdate(
                { username: userCheck.username },
                req.body,
                {
                    new: true,
                }
            ).select("-password");
            return dbUser
                ? res.status(200).json({ message: "User Updated" })
                : next(createError(404, "No Users Found"));
        }
    } catch (err) {
        next(err);
    }
};

export const getUserbyId = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) {
            return next(createError(401, "Id Required"));
        }

        const dbUser = await User.findOne({ _id: id }).select("-password");
        return dbUser
            ? res.status(200).json(dbUser)
            : next(createError(404, "No Users Found"));
    } catch (err) {
        next(err);
    }
};

export const updateUserbyId = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) {
            return next(createError(401, "Id Required"));
        }

        const dbUser = await User.findOneAndUpdate({ _id: id }, req.body, {
            new: true,
        }).select("-password");
        return dbUser
            ? res.status(200).json({ message: "User Updated" })
            : next(createError(404, "No Users Found"));
    } catch (err) {
        next(err);
    }
};

export const deleteUserbyId = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) {
            return next(createError(401, "Id Required"));
        }

        const dbUser = await User.findOneAndDelete({ _id: id }).select(
            "-password"
        );

        return dbUser
            ? res.status(200).json({ message: "User Deleted" })
            : next(createError(404, "No Users Found"));
    } catch (err) {
        next(err);
    }
};
