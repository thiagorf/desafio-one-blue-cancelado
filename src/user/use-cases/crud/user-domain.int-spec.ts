import prisma from "../../../prisma";
import { CreateUserDto } from "../dto/create-user.dto";
import { EXCEPTION, MSG } from "../user.constraints";
import {
    createUserUseCase,
    deleteUserUseCase,
    findOneUserUseCase,
    returnAllUsersThoughtsUseCase,
    updateUserUseCase,
} from "./user-domain";

const userDto = {
    name: "john",
    email: "john@gmail.com",
    password: "1234",
};

const updateUserDto = {
    name: "Joe",
    email: "joe@gmail.com",
};

const updateInvalidDto = {
    name: "Joe",
    email: "john@gmail.com",
};

async function create(userDto: CreateUserDto) {
    return await prisma.user.create({
        data: userDto,
        select: {
            id: true,
            name: true,
            email: true,
        },
    });
}

describe("User module integration test", () => {
    beforeEach(async () => {
        await prisma.likes.deleteMany();
        await prisma.thoughts.deleteMany();
        await prisma.user.deleteMany();
    });
    afterAll(async () => {
        await prisma.likes.deleteMany();
        await prisma.thoughts.deleteMany();
        await prisma.user.deleteMany();
    });

    describe("createUserUseCase", () => {
        it("Should be able to create an user", async () => {
            const sut = await createUserUseCase(userDto);

            expect(sut).toHaveProperty("id");
            expect(sut.name).toEqual(userDto.name);
        });
        it("Should not be able create an user with an already used email", async () => {
            await createUserUseCase(userDto);

            expect(async () => {
                await createUserUseCase(userDto);
            }).rejects.toThrow(EXCEPTION.IN_USE);
        });
    });

    describe("findOneUserUseCase", () => {
        it("Should be able to return one user", async () => {
            const user = await create(userDto);

            const sut = await findOneUserUseCase(user.id);

            expect(sut).toEqual(user);
            expect(sut.id).toBe(user.id);
        });
        it("Should not be able to return an invalid user", () => {
            expect(async () => {
                await findOneUserUseCase(1);
            }).rejects.toThrow(EXCEPTION.INVALID);
        });
    });
    describe("updateUserUseCase", () => {
        it("Should be able to update an user", async () => {
            const user = await create(userDto);
            const sut = await updateUserUseCase(user.id, updateUserDto);

            expect(sut).not.toEqual(user);
            expect(sut.name).not.toEqual(user.name);
        });
        it("Should not be able to update an invalid user", () => {
            expect(async () => {
                await updateUserUseCase(1, updateUserDto);
            }).rejects.toThrow(EXCEPTION.INVALID);
        });
        it("Should not update the email if is already been used", async () => {
            await prisma.user.create({
                data: userDto,
            });

            const user = await prisma.user.create({
                data: { ...userDto, email: "john2@gmail.com" },
            });

            expect(async () => {
                await updateUserUseCase(user.id, updateInvalidDto);
            }).rejects.toThrow(EXCEPTION.IN_USE);
        });
    });
    describe("deleteUserUseCase", () => {
        it("Should be able to delete an user", async () => {
            const user = await create(userDto);

            const sut = await deleteUserUseCase(user.id);
            const count = await prisma.user.count();

            expect(sut.msg).toEqual(MSG.DELETED);
            expect(count).toBe(0);
        });
        it("Should not be able to delete an invalid user", () => {
            expect(async () => {
                await deleteUserUseCase(1);
            }).rejects.toThrow(EXCEPTION.INVALID);
        });
    });
    describe("returnAllUsersThoughtsUseCase", () => {
        it("Should be able to return all users and thoughts", async () => {
            await create(userDto);
            const sut = await returnAllUsersThoughtsUseCase();

            expect(sut).toHaveLength(1);
            expect(sut[0].thoughts).toHaveLength(0);
        });
    });
});
