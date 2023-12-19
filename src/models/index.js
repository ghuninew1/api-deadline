import mongoose from "mongoose";

const db = {};

db.mongoose = mongoose;

export const connectDBs = () => {
    try {
        const userDB = mongoose.createConnection(process.env.MONGODB_URI);
        const deadlineDB = mongoose.createConnection(process.env.MONGODB_URI3);

        return { userDB, deadlineDB };
    } catch (error) {
        console.error(`Error:${error.message}`);
        process.exit(1);
    }
};

db.userDB = connectDBs().userDB;
db.deadlineDB = connectDBs().deadlineDB;

export default db;
