import { Router } from "express";
import { userEndpoint, authEndpoint } from "./user/user.endpoint";
import { thoughtEndpoint } from "./thoughts/thought.endpoint";
import { checkAuthMiddleware } from "./middleware/check-auth.middleware";

const v1 = Router();

const userResource = Router();
const authResource = Router();
const thoughtResource = Router();

const resources = [userResource, authResource, thoughtResource];

userResource.use("/users", userEndpoint);
authResource.use("/auth", authEndpoint);
thoughtResource.use("/thoughts", thoughtEndpoint);

resources.forEach((resource) => v1.use("/v1", resource));

export { v1 };
