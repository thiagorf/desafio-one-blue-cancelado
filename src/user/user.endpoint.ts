import { Router } from "express";
import { checkAuthMiddleware } from "../middleware/check-auth.middleware";
import {
    loginController,
    logoutController,
} from "./use-cases/auth/auth-controller";
import {
    createUserController,
    deleteUserController,
    findOneUserController,
    updateUserController,
    returnAllUsersThoughtsController,
} from "./use-cases/crud/user-controller";

const userEndpoint = Router();

userEndpoint.get("/thoughts", returnAllUsersThoughtsController);
userEndpoint.get("/:id", findOneUserController);
userEndpoint.post("/", createUserController);
userEndpoint.put("/:id", checkAuthMiddleware, updateUserController);
userEndpoint.delete("/:id", checkAuthMiddleware, deleteUserController);

const authEndpoint = Router();

authEndpoint.post("/login", loginController);
authEndpoint.post("/logout", logoutController);

export { userEndpoint, authEndpoint };
