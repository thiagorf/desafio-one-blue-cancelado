import "express-async-errors";
import dotenv from "dotenv";
dotenv.config();
import express, { json, NextFunction, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import { v1 } from "./routes";
import session from "express-session";
import connectRedis from "connect-redis";
import { redis } from "./redis";
import options from "../swagger.json";
import { MSG } from "./user/use-cases/user.constraints";

const app = express();

const RedisStore = connectRedis(session);

app.use(json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(options));

app.use(
    session({
        store: new RedisStore({
            client: redis,
        }),
        name: "sid",
        secret: process.env.SECRET!,
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 1000 * 60 * 2,
            sameSite: "lax",
        },
    })
);

app.use(v1);

app.listen(8000, () => {
    console.log("Server is running");
});
