import { Request, Response } from "express";
import { findUserByEmail } from "../../../user/use-cases/repositories/user.repository";
import { CreateThoughtDto } from "../dto/create-thought.dto";
import { UpdateThoughtDto } from "../dto/update-thought.dto";
import {
    createThoughtUseCase,
    deleteThoughtUseCase,
    findOneThoughtUseCase,
    updateThoughtUseCase,
} from "./thought-domain";

async function findOneThoughtController(req: Request, res: Response) {
    const id = req.params.id;

    return res.json(await findOneThoughtUseCase(+id));
}

async function createThoughtController(req: Request, res: Response) {
    const dto = req.body;

    const authenticatedUser = await findUserByEmail(req.session.email!);

    const createThoughtData: CreateThoughtDto = {
        ...dto,
        user_id: authenticatedUser!.id,
    };

    return res.status(201).json(await createThoughtUseCase(createThoughtData));
}

async function updateThoughtController(req: Request, res: Response) {
    const id = req.params.id;
    const dto = req.body;

    const authenticatedUser = await findUserByEmail(req.session.email!);

    const updateThoughtData: UpdateThoughtDto = {
        ...dto,
        user_id: authenticatedUser!.id,
    };

    return res.json(
        await updateThoughtUseCase(
            +id,
            authenticatedUser!.id,
            updateThoughtData
        )
    );
}
async function deleteThoughtController(req: Request, res: Response) {
    const id = req.params.id;

    const authenticatedUser = await findUserByEmail(req.session.email!);

    return res.json(await deleteThoughtUseCase(+id, authenticatedUser!.id));
}

export {
    findOneThoughtController,
    createThoughtController,
    deleteThoughtController,
    updateThoughtController,
};
