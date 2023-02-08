import prisma from "../../../prisma";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { EXCEPTION } from "../user.constraints";

const userSelect = {
    id: true,
    name: true,
    email: true,
};

async function findUserByIdOrThrow(id: number) {
    const user = await findUserById(id);

    if (!user) {
        throw new Error(EXCEPTION.INVALID);
    }

    return user;
}

async function createUser(userDto: CreateUserDto) {
    const createdUser = await prisma.user.create({
        data: userDto,
        select: userSelect,
    });

    return createdUser;
}

async function findUserById(id: number) {
    return await prisma.user.findUnique({
        where: {
            id,
        },
        select: userSelect,
    });
}
async function findUserByEmail(email: string) {
    return await prisma.user.findUnique({
        where: {
            email,
        },
    });
}

async function updateUser(id: number, updateUserDto: UpdateUserDto) {
    return await prisma.user.update({
        where: {
            id,
        },
        data: updateUserDto,
        select: userSelect,
    });
}

async function deleteUser(id: number) {
    return await prisma.user.delete({
        where: {
            id,
        },
        select: userSelect,
    });
}

async function allUsersAllThoughts() {
    return await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            thoughts: {
                orderBy: {
                    created_at: "asc",
                },
            },
        },
    });
}

export {
    createUser,
    findUserById,
    findUserByEmail,
    updateUser,
    deleteUser,
    findUserByIdOrThrow,
    allUsersAllThoughts,
};
