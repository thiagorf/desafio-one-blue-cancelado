import prisma from "../../../prisma";
import { EXCEPTION } from "../thought.constraints";
import { likeThoughtUseCase, removeLikeThoughtUseCase } from "./likes-domain";

const userDto = {
    name: "john",
    email: "john@gmail.com",
    password: "1234",
};

const thoughtDto = {
    thought: "WOW",
    user_id: 1,
};

describe("Likes Domain integration test", () => {
    beforeEach(async () => {
        await prisma.likes.deleteMany();
        await prisma.thoughts.deleteMany();
        await prisma.user.deleteMany();
    });
    describe("likeThoughtUseCase", () => {
        it("Should be able to like a thought and update the likes quantity", async () => {
            const u = await prisma.user.create({
                data: userDto,
            });
            const t = await prisma.thoughts.create({
                data: {
                    thought: thoughtDto.thought,
                    user_id: u.id,
                },
            });

            const sut = await likeThoughtUseCase(t.id, u.id);
            const updatedThought = await prisma.thoughts.findUnique({
                where: {
                    id: sut.thought_id,
                },
            });

            expect(sut).toHaveProperty("id");
            expect(updatedThought?.likes_qty).toBe(1);
        });
        it("Should not be able to like an invalid thought", () => {
            expect(async () => {
                await likeThoughtUseCase(0, 1);
            }).rejects.toThrow(EXCEPTION.INVALID);
        });
    });
    describe("removeLikeThoughtUseCase", () => {
        it("Should be able to remove a like in a thoughtan decrease the number of likes", async () => {
            const u = await prisma.user.create({
                data: userDto,
            });
            const t = await prisma.thoughts.create({
                data: {
                    thought: thoughtDto.thought,
                    user_id: u.id,
                    likes_qty: 1,
                },
            });

            const like = await prisma.likes.create({
                data: {
                    thought_id: t.id,
                    user_id: u.id,
                },
            });

            const sut = await removeLikeThoughtUseCase(
                like.thought_id,
                like.user_id
            );
            const updatedThought = await prisma.thoughts.findUnique({
                where: {
                    id: sut.thought_id,
                },
            });

            expect(sut).not.toBeNull();
            expect(updatedThought?.likes_qty).toBe(0);
        });
        it("Should not be able to remove a like in an invalid thought", () => {
            expect(async () => {
                await removeLikeThoughtUseCase(0, 0);
            }).rejects.toThrow(EXCEPTION.INVALID);
        });
    });
});
