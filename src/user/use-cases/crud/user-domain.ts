import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import {
    createUser,
    findUserByEmail,
    updateUser,
    deleteUser,
    findUserByIdOrThrow,
    allUsersAllThoughts,
} from "../repositories/user.repository";
import { EXCEPTION, MSG } from "../user.constraints";
import { hash } from "bcrypt";

async function createUserUseCase(userDto: CreateUserDto) {
    const userEmail = await findUserByEmail(userDto.email);

    if (userEmail) {
        throw new Error(EXCEPTION.IN_USE);
    }

    const hashPassword = await hash(userDto.password, 10);

    return await createUser({ ...userDto, password: hashPassword });
}

async function findOneUserUseCase(id: number) {
    return await findUserByIdOrThrow(id);
}

async function updateUserUseCase(id: number, updateUserDto: UpdateUserDto) {
    const user = await findUserByIdOrThrow(id);

    return await updateUser(user.id, updateUserDto);
}

async function deleteUserUseCase(id: number) {
    const user = await findUserByIdOrThrow(id);

    await deleteUser(user.id);

    return {
        msg: MSG.DELETED,
    };
}

async function returnAllUsersThoughtsUseCase() {
    return await allUsersAllThoughts();
}

export {
    createUserUseCase,
    findOneUserUseCase,
    updateUserUseCase,
    deleteUserUseCase,
    returnAllUsersThoughtsUseCase,
};
