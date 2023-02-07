import { Request, Response } from "express";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import {
    createUserUseCase,
    deleteUserUseCase,
    findOneUserUseCase,
    updateUserUseCase,
} from "./user-domain";

async function findOneUserController(req: Request, res: Response) {
    const id = req.params.id;

    return await findOneUserUseCase(+id);
}

async function createUserController(req: Request, res: Response) {
    const dto: CreateUserDto = req.body;

    return await createUserUseCase(dto);
}

// check session id
async function updateUserController(req: Request, res: Response) {
    const id = req.params.id;

    const dto: UpdateUserDto = req.body;

    return await updateUserUseCase(+id, dto);
}

async function deleteUserController(req: Request, res: Response) {
    const id = req.params.id;

    return await deleteUserUseCase(+id);
}

export {
    findOneUserController,
    createUserController,
    updateUserController,
    deleteUserController,
};
