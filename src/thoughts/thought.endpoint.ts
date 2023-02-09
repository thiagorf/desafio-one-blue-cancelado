import { Router } from "express";
import { checkAuthMiddleware } from "../middleware/check-auth.middleware";
import {
    createThoughtController,
    deleteThoughtController,
    findOneThoughtController,
    updateThoughtController,
} from "./use-cases/crud/thought-controller";

import {
    likeThoughtController,
    removeLikeThoughtController,
} from "./use-cases/likes/likes-controller";

const thoughtEndpoint = Router();

thoughtEndpoint.post(
    "/:thought_id/like",
    checkAuthMiddleware,
    likeThoughtController
);
thoughtEndpoint.delete(
    "/:thought_id/remove_like",
    checkAuthMiddleware,
    removeLikeThoughtController
);

thoughtEndpoint.get("/:id", findOneThoughtController);
thoughtEndpoint.post("/", checkAuthMiddleware, createThoughtController);
thoughtEndpoint.put("/:id", checkAuthMiddleware, updateThoughtController);
thoughtEndpoint.delete("/:id", checkAuthMiddleware, deleteThoughtController);

export { thoughtEndpoint };
