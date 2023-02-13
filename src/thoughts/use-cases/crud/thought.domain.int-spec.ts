import prisma from "../../../prisma";
import { CreateThoughtDto } from "../dto/create-thought.dto";
import { EXCEPTION, MSG } from "../thought.constraints";

import { MSG as USER_MSG } from "../../../user/use-cases/user.constraints";
import {
    createThoughtUseCase,
    deleteThoughtUseCase,
    findOneThoughtUseCase,
    updateThoughtUseCase,
} from "./thought-domain";

const thoughtDto = {
    thought: "WOW",
    user_id: 1,
};

const updateThoughtDto = {
    thought: "WOWWWWWWWWWWWWWWW",
};

async function create(thoughtDto: CreateThoughtDto) {
    const u = await prisma.user.create({
        data: {
            name: "john",
            email: "john@gmail.com",
            password: "1234",
        },
    });
    return await prisma.thoughts.create({
        data: {
            thought: thoughtDto.thought,
            user_id: u.id,
        },
    });
}

describe("Thoght domain integration tests", () => {
    beforeEach(async () => {
        await prisma.likes.deleteMany();
        await prisma.thoughts.deleteMany();
        await prisma.user.deleteMany();
    });
    describe("createThoughtUseCase", () => {
        it("Should be able to create an thought", async () => {
            const u = await prisma.user.create({
                data: {
                    name: "john",
                    email: "john@gmail.com",
                    password: "1234",
                },
            });
            const sut = await createThoughtUseCase({
                ...thoughtDto,
                user_id: u.id,
            });

            expect(sut).toHaveProperty("id");
            expect(sut).toHaveProperty("created_at");
        });
    }),
        describe("findOneThoughtUseCase", () => {
            it("Should be able to find one thought", async () => {
                const thought = await create(thoughtDto);

                const sut = await findOneThoughtUseCase(thought.id);

                expect(sut).not.toBe(null);
            });
            it("Should not be able to find an invalid thought", () => {
                expect(async () => {
                    await findOneThoughtUseCase(1);
                }).rejects.toThrow(EXCEPTION.INVALID);
            });
        }),
        describe("deleteThoughtUseCase", () => {
            it("Should be able to delete a thought", async () => {
                const thought = await create(thoughtDto);

                const sut = await deleteThoughtUseCase(
                    thought.id,
                    thought.user_id
                );

                expect(sut.msg).toEqual(MSG.DELETED);
            });
            it("Should not be able to delete a invalid thought", () => {
                expect(async () => {
                    await deleteThoughtUseCase(1, 1);
                }).rejects.toThrow(EXCEPTION.INVALID);
            });
            it("Should not be able to delete a thought for another user", async () => {
                const thought = await create(thoughtDto);

                expect(async () => {
                    await deleteThoughtUseCase(thought.id, 12);
                }).rejects.toThrow(USER_MSG.UNAUTHORIZED);
            });
        }),
        describe("updateThoughtUseCase", () => {
            it("Should be able to update an user", async () => {
                const thought = await create(thoughtDto);

                const sut = await updateThoughtUseCase(
                    thought.id,
                    thought.user_id,
                    updateThoughtDto
                );

                expect(sut.thought).not.toEqual(thought.thought);
            });
            it("Should not be able to update an invalid thought", () => {
                expect(async () => {
                    await updateThoughtUseCase(1, 1, updateThoughtDto);
                }).rejects.toThrow(EXCEPTION.INVALID);
            });
            it("Should not be able to update another user thought", async () => {
                const thought = await create(thoughtDto);

                expect(async () => {
                    await updateThoughtUseCase(
                        thought.id,
                        1312,
                        updateThoughtDto
                    );
                }).rejects.toThrow(USER_MSG.UNAUTHORIZED);
            });
        });
});
