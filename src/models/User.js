import db from "#models/index.js";

const UserSchema = new db.mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
        },
        password: {
            type: String,
        },
        roles: {
            type: Number,
            default: 100,
        },
        token: {
            type: String,
        },
        refreshToken: {
            type: String,
        },
        expires: {
            type: Date,
        },
        img: {
            type: String,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

// export default mongoose.model("user", UserSchema);
export default db.userDB.model("user", UserSchema);
