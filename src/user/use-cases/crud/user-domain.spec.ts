import { prismaMock } from "../../../../singleton";
import { EXCEPTION } from "../user.constraints";
import * as userRepository from "../repositories/user.repository";
import {
    createUserUseCase,
    findOneUserUseCase,
    updateUserUseCase,
    deleteUserUseCase,
} from "./user-domain";

const createUserDto = {
    name: "John",
    email: "john@gmail.com",
    password: "1234",
};

const user = {
    ...createUserDto,
    id: 1,
};

const updateDto = {
    name: "Joe",
    email: "Joe@gmail.com",
};

const updatedResult = {
    ...updateDto,
    id: 1,
    password: "1234",
};

describe("User Domain tests", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    describe("createUserUseCase", () => {
        it("Should be able to create an user", () => {
            prismaMock.user.findUnique.mockResolvedValue(null);
            prismaMock.user.create.mockResolvedValue(user);

            expect(async () => {
                await createUserUseCase(createUserDto);
            }).not.toThrow(EXCEPTION.IN_USE);
        });
        it("Should not be able to create an user with an already registred email", () => {
            prismaMock.user.findUnique.mockResolvedValue(user);

            expect(async () => {
                await createUserUseCase(createUserDto);
            }).rejects.toThrow(EXCEPTION.IN_USE);
        });
    });
    describe("findOneUserUseCase", () => {
        it("Should be able to find one user", () => {
            prismaMock.user.findUnique.mockResolvedValue(user);

            expect(async () => {
                await findOneUserUseCase(1);
            }).not.toThrow(EXCEPTION.INVALID);
        });
        it("Should not be able to return an invalid user", () => {
            prismaMock.user.findUnique.mockResolvedValue(null);

            expect(async () => {
                await findOneUserUseCase(1);
            }).rejects.toThrow(EXCEPTION.INVALID);
        });
    });
    describe("updateUserUseCase", () => {
        it("Should be able to update an user", async () => {
            prismaMock.user.findUnique.mockResolvedValue(user);
            prismaMock.user.update.mockResolvedValue(updatedResult);
            jest.spyOn(userRepository, "findUserByEmail").mockResolvedValue(
                null
            );
            const sut = await updateUserUseCase(1, updateDto);

            expect(async () => {
                await updateUserUseCase(1, updateDto);
            }).not.toThrow(EXCEPTION.INVALID);
            expect(sut.name).toBe(updateDto.name);
        });
        it("Should not be able to update an user with an already used email", () => {
            prismaMock.user.findUnique.mockResolvedValueOnce(user);
            jest.spyOn(userRepository, "findUserByEmail").mockResolvedValue(
                updatedResult
            );

            expect(async () => {
                await updateUserUseCase(1, updateDto);
            }).rejects.toThrow(EXCEPTION.IN_USE);
        });
        it("Should not be able to update an invalid user", () => {
            prismaMock.user.findUnique.mockResolvedValue(null);
            expect(async () => {
                await updateUserUseCase(1, updateDto);
            }).rejects.toThrow(EXCEPTION.INVALID);
        });
    });
    describe("deleteUserUseCase", () => {
        it("Should be able to delete an user", () => {
            prismaMock.user.findUnique.mockResolvedValue(user);
            expect(async () => {
                await deleteUserUseCase(1);
            }).not.toThrow(EXCEPTION.INVALID);
        });
        it("Should not be able to delete an invalid user", () => {
            prismaMock.user.findUnique.mockResolvedValue(null);
            expect(async () => {
                await deleteUserUseCase(1);
            }).rejects.toThrow(EXCEPTION.INVALID);
        });
    });
});
