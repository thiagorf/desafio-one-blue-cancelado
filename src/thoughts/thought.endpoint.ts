import { Router } from "express";
import {
    createThoughtController,
    deleteThoughtController,
    findOneThoughtController,
    updateThoughtController,
} from "./use-cases/crud/thought-controller";

const thoughtEndpoint = Router();

thoughtEndpoint.get("/:id", findOneThoughtController);
thoughtEndpoint.post("/", createThoughtController);
thoughtEndpoint.put("/:id", updateThoughtController);
thoughtEndpoint.delete("/:id", deleteThoughtController);

export { thoughtEndpoint };
