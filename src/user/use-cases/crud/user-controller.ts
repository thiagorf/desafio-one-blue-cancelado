import { Request, Response } from "express";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { findUserByEmail } from "../repositories/user.repository";
import { MSG } from "../user.constraints";
import {
    createUserUseCase,
    deleteUserUseCase,
    findOneUserUseCase,
    updateUserUseCase,
    returnAllUsersThoughtsUseCase,
} from "./user-domain";

async function checkUserIsTheRightOne(id: number, req: Request, res: Response) {
    const authenticated_email = req.session.email!;

    const authenticatedUser = await findUserByEmail(authenticated_email);

    if (authenticatedUser!.id !== +id) {
        return res.status(401).json({
            msg: MSG.UNAUTHORIZED,
        });
    }
}

async function findOneUserController(req: Request, res: Response) {
    const id = req.params.id;

    return res.json(await findOneUserUseCase(+id));
}

async function createUserController(req: Request, res: Response) {
    const dto: CreateUserDto = req.body;

    return res.status(201).json(await createUserUseCase(dto));
}

// check session id
async function updateUserController(req: Request, res: Response) {
    const id = req.params.id;

    await checkUserIsTheRightOne(+id, req, res);

    const dto: UpdateUserDto = req.body;

    return res.json(await updateUserUseCase(+id, dto));
}

async function deleteUserController(req: Request, res: Response) {
    const id = req.params.id;

    await checkUserIsTheRightOne(+id, req, res);

    return res.json(await deleteUserUseCase(+id));
}

async function returnAllUsersThoughtsController(req: Request, res: Response) {
    return res.json(await returnAllUsersThoughtsUseCase());
}

export {
    findOneUserController,
    createUserController,
    updateUserController,
    deleteUserController,
    returnAllUsersThoughtsController,
    checkUserIsTheRightOne,
};
