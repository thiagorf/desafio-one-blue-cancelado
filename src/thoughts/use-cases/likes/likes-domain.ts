import {
    likeThought,
    removeLikeThought,
} from "../repositories/like.repository";
import { findOneThoughtOrThrow } from "../repositories/thought.repository";

async function likeThoughtUseCase(thought_id: number, user_id: number) {
    // user is already checked in the auth middleware
    const thoughtExists = await findOneThoughtOrThrow(thought_id);

    return await likeThought(thoughtExists.id, user_id);
}
async function removeLikeThoughtUseCase(thought_id: number, user_id: number) {
    const thoughtExists = await findOneThoughtOrThrow(thought_id);

    return await removeLikeThought(thoughtExists.id, user_id);
}

export { likeThoughtUseCase, removeLikeThoughtUseCase };
