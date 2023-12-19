import express from "express";
import { createServer } from "node:http";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import createError from "#utils/createError.js";
import corsOptions from "#utils/corsOptions.js";
import {
    rootRoute,
    authRoute,
    comRoute,
    deadlineRoute,
    userRoute,
} from "#routes/index.js";

const app = express();
app.disable("x-powered-by");

// view engine setup
app.set("views", "./public");
app.set("view engine", "html");
app.set("trust proxy", true);

// middlewares
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(express.static("./public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// logger
app.use(morgan("dev"));

app.use((req, res, next) => {
    res.setHeader("X-Powered-By", "GhuniNew");
    next();
});

// Routes
app.use("/", rootRoute, authRoute, comRoute, deadlineRoute, userRoute);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const error = createError(404, "Not Found");
    res.status(error.status).json({
        status: error.status,
        message: error.message,
    });

    next();
});

// error handler
app.use((err, req, res, next) => {
    const error = createError(err.status, err.message);
    res.status(error.status).json({
        status: error.status,
        message: error.message,
    });

    next();
});

// server
const server = createServer(app);
server.timeout = 5000;
server.keepAliveTimeout = 5000;
server.headersTimeout = 5000;
server.maxHeadersCount = 5000;
server.maxConnections = 5000;
server.listen(process.env.PORT || 3000);

// server events
server.on("error", (err) => {
    console.log(err);
});
server.on("listening", () => {
    console.log(
        `Server is running on http://localhost:${server.address().port}`
    );
});

export default server;
