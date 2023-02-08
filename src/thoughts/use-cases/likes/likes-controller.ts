import { Request, Response } from "express";
import { findUserByEmail } from "../../../user/use-cases/repositories/user.repository";
import { likeThoughtUseCase, removeLikeThoughtUseCase } from "./likes-domain";

async function likeThoughtController(req: Request, res: Response) {
    const thought_id = req.params.thought_id;

    const authenticatedUser = await findUserByEmail(req.session.email!);

    return res
        .status(201)
        .json(await likeThoughtUseCase(+thought_id, authenticatedUser!.id));
}
async function removeLikeThoughtController(req: Request, res: Response) {
    const thought_id = req.params.thought_id;

    const authenticatedUser = await findUserByEmail(req.session.email!);

    return res.json(
        await removeLikeThoughtUseCase(+thought_id, authenticatedUser!.id)
    );
}

export { likeThoughtController, removeLikeThoughtController };
