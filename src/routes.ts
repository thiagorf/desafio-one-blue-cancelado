import { Router } from "express";
import { userEndpoint } from "./user/user.endpoint";

const v1 = Router();
const userResource = Router();

const resources = [userResource];

userResource.use("/users", userEndpoint);

resources.forEach((resource) => v1.use("/v1", resource));

export { v1 };
