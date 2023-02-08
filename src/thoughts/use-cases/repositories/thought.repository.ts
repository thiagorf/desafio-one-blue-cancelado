import prisma from "../../../prisma";
import { CreateThoughtDto } from "../dto/create-thought.dto";
import { UpdateThoughtDto } from "../dto/update-thought.dto";
import { EXCEPTION } from "../thought.constraints";

async function findOneThoughtOrThrow(id: number) {
    const thought = await prisma.thoughts.findUnique({
        where: {
            id,
        },
    });

    if (!thought) {
        throw new Error(EXCEPTION.INVALID);
    }

    return thought;
}

async function createThought(thoughtDto: CreateThoughtDto) {
    const thought = await prisma.thoughts.create({
        data: thoughtDto,
    });

    return thought;
}

async function findOneThought(id: number) {
    return await prisma.thoughts.findUnique({
        where: {
            id,
        },
    });
}

async function deleteThought(id: number) {
    return await prisma.thoughts.delete({
        where: {
            id,
        },
    });
}

async function updateThought(id: number, thoughtDto: UpdateThoughtDto) {
    const thought = await prisma.thoughts.update({
        where: {
            id,
        },
        data: thoughtDto,
    });

    return thought;
}

export {
    createThought,
    findOneThought,
    deleteThought,
    updateThought,
    findOneThoughtOrThrow,
};
