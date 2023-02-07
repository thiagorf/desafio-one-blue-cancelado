import { Router } from "express";
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

export { userEndpoint };
