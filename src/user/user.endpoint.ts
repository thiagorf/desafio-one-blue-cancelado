import { Router } from "express";
import {
    loginController,
    logoutController,
} from "./use-cases/auth/auth-controller";
import {
    createUserController,
    deleteUserController,
    findOneUserController,
    updateUserController,
} from "./use-cases/crud/user-controller";

const userEndpoint = Router();

userEndpoint.get("/:id", findOneUserController);
userEndpoint.post("/", createUserController);
userEndpoint.put("/:id", updateUserController);
userEndpoint.delete("/:id", deleteUserController);

const authEndpoint = Router();

authEndpoint.post("/", loginController);
authEndpoint.post("/", logoutController);

export { userEndpoint, authEndpoint };
