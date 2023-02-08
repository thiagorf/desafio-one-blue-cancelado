import { Router } from "express";
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

thoughtEndpoint.post("/:thought_id/like", likeThoughtController);
thoughtEndpoint.delete("/:thought_id/remove_like", removeLikeThoughtController);

thoughtEndpoint.get("/:id", findOneThoughtController);
thoughtEndpoint.post("/", createThoughtController);
thoughtEndpoint.put("/:id", updateThoughtController);
thoughtEndpoint.delete("/:id", deleteThoughtController);

export { thoughtEndpoint };
