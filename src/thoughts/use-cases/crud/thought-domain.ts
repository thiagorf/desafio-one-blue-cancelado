import { CreateThoughtDto } from "../dto/create-thought.dto";
import { UpdateThoughtDto } from "../dto/update-thought.dto";
import {
    createThought,
    deleteThought,
    updateThought,
    findOneThoughtOrThrow,
} from "../repositories/thought.repository";
import { MSG } from "../thought.constraints";
import { MSG as USER_MSG } from "../../../user/use-cases/user.constraints";

async function createThoughtUseCase(thoughtDto: CreateThoughtDto) {
    return await createThought(thoughtDto);
}

async function findOneThoughtUseCase(id: number) {
    const thought = await findOneThoughtOrThrow(id);

    return thought;
}

async function deleteThoughtUseCase(id: number, auth_id: number) {
    const thought = await findOneThoughtOrThrow(id);

    if (thought.user_id !== auth_id) {
        throw new Error(USER_MSG.UNAUTHORIZED);
    }

    await deleteThought(thought.id);

    return {
        msg: MSG.DELETED,
    };
}

async function updateThoughtUseCase(
    thought_id: number,
    auth_id: number,
    thoughtDto: UpdateThoughtDto
) {
    const thought = await findOneThoughtOrThrow(thought_id);

    if (thought.user_id !== auth_id) {
        throw new Error(USER_MSG.UNAUTHORIZED);
    }

    return await updateThought(thought.id, thoughtDto);
}

export {
    createThoughtUseCase,
    findOneThoughtUseCase,
    deleteThoughtUseCase,
    updateThoughtUseCase,
};
