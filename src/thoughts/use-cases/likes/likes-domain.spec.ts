import { prismaMock } from "../../../../singleton";
import { EXCEPTION } from "../thought.constraints";
import { likeThoughtUseCase, removeLikeThoughtUseCase } from "./likes-domain";

const thought = {
    id: 1,
    thought: "WOW",
    user_id: 1,
    likes_qty: 0,
    created_at: new Date(),
};
const like = {
    id: 1,
    thought_id: 1,
    user_id: 1,
};

describe("Thought Domain test", () => {
    describe("likeThoughtUseCase", () => {
        it("Should be able to like a thought", () => {
            prismaMock.thoughts.findUnique.mockResolvedValue(thought);

            const mockedTransaction = [
                like,
                {
                    ...thought,
                    likes_qty: 1,
                },
            ];
            prismaMock.$transaction.mockResolvedValue(mockedTransaction);

            expect(async () => {
                await likeThoughtUseCase(1, 1);
            }).not.toThrow(EXCEPTION.INVALID);
        });
        it("Should not be able to like an invalid thought", () => {
            prismaMock.user.findUnique.mockResolvedValue(null);
            expect(async () => {
                await likeThoughtUseCase(1, 1);
            }).rejects.toThrow(EXCEPTION.INVALID);
        });
    });
    describe("removeLikeThoughtUseCase", () => {
        it("Should be able to remove like in a thought", () => {
            prismaMock.thoughts.findUnique.mockResolvedValue(thought);

            prismaMock.likes.findFirst.mockResolvedValue(like);
            prismaMock.likes.delete.mockResolvedValue(like);
            prismaMock.thoughts.update.mockResolvedValue({
                ...thought,
                likes_qty: 0,
            });

            prismaMock.$transaction.mockResolvedValue(like);

            expect(async () => {
                await removeLikeThoughtUseCase(1, 1);
            }).not.toThrow(EXCEPTION.INVALID);
        });
        it("Should not be able to remove like and invalid thought", () => {
            prismaMock.thoughts.findUnique.mockResolvedValue(null);

            expect(async () => {
                await removeLikeThoughtUseCase(1, 1);
            }).rejects.toThrow(EXCEPTION.INVALID);
        });
    });
});
