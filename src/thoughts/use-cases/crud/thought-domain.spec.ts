import { prismaMock } from "../../../../singleton";
import { MSG } from "../../../user/use-cases/user.constraints";
import { EXCEPTION } from "../thought.constraints";
import { deleteThoughtUseCase, findOneThoughtUseCase } from "./thought-domain";

const thought = {
    id: 1,
    thought: "WOW",
    user_id: 1,
    likes_qty: 0,
    created_at: new Date(),
};

describe("Thought Domain test", () => {
    describe("findOneThoughtUseCase", () => {
        it("Should be able to find one thought", () => {
            prismaMock.thoughts.findUnique.mockResolvedValue(thought);

            expect(async () => {
                await findOneThoughtUseCase(1);
            }).not.toThrow(EXCEPTION.INVALID);
        });
        it("Should not be able to find an invalid thought", () => {
            prismaMock.thoughts.findUnique.mockResolvedValue(null);

            expect(async () => {
                await findOneThoughtUseCase(1);
            }).rejects.toThrow(EXCEPTION.INVALID);
        });
    });
    describe("deleteThoughtUseCase", () => {
        it("Should be able to delete one thought", () => {
            prismaMock.thoughts.findUnique.mockResolvedValue(thought);
            prismaMock.thoughts.delete.mockResolvedValue(thought);

            expect(async () => {
                await deleteThoughtUseCase(1, 1);
            }).not.toThrow(EXCEPTION.INVALID);
        });
        it("Should not be able to delete an invalid thought", () => {
            prismaMock.thoughts.findUnique.mockResolvedValue(null);

            expect(async () => {
                await deleteThoughtUseCase(1, 1);
            }).rejects.toThrow(EXCEPTION.INVALID);
        });
        it("Should not be able to delete a thought of another user", () => {
            prismaMock.thoughts.findUnique.mockResolvedValue(thought);

            expect(async () => {
                await deleteThoughtUseCase(1, 2);
            }).rejects.toThrow(MSG.UNAUTHORIZED);
        });
    });
    describe("updateThoughtUseCase", () => {
        it("Should be able to update one thought", () => {
            prismaMock.thoughts.findUnique.mockResolvedValue(thought);
            prismaMock.thoughts.update.mockResolvedValue(thought);

            expect(async () => {
                await deleteThoughtUseCase(1, 1);
            }).not.toThrow(EXCEPTION.INVALID);
        });
        it("Should not be able to update an invalid thought", () => {
            prismaMock.thoughts.findUnique.mockResolvedValue(null);

            expect(async () => {
                await deleteThoughtUseCase(1, 1);
            }).rejects.toThrow(EXCEPTION.INVALID);
        });
        it("Should not be able to update a thought of another user", () => {
            prismaMock.thoughts.findUnique.mockResolvedValue(thought);

            expect(async () => {
                await deleteThoughtUseCase(1, 3);
            }).rejects.toThrow(MSG.UNAUTHORIZED);
        });
    });
});
