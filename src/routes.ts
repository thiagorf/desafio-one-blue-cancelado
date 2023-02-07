import { Router } from "express";
import { userEndpoint, authEndpoint } from "./user/user.endpoint";

const v1 = Router();

const userResource = Router();
const authResource = Router();

const resources = [userResource, authResource];

userResource.use("/users", userEndpoint);
authResource.use("/auth", authEndpoint);

resources.forEach((resource) => v1.use("/v1", resource));

export { v1 };
