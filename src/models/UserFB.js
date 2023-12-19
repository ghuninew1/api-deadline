import db from "#models/index.js";

const UserFBSchema = new db.mongoose.Schema(
    {
        username: {
            type: String,
        },
        email: {
            type: String,
        },
        password: {
            type: String,
        },
        uid: {
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

// export default mongoose.model("userline", UserlineSchema);

export default db.userDB.model("userfb", UserFBSchema);
