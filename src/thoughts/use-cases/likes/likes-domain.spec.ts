import { prismaMock } from "../../../../singleton";
import { EXCEPTION } from "../thought.constraints";
import { likeThoughtUseCase } from "./likes-domain";

const user = {
    id: 1,
    name: "John",
    email: "john@gmail.com",
    password: "1234",
};
const like = {
    id: 1,
    thought_id: 1,
    user_id: 1,
};

describe("Thought Domain test", () => {
    describe("likeThoughtUseCase", () => {
        it("Should be able to like a thought", () => {
            prismaMock.user.findUnique.mockResolvedValue(user);
            prismaMock.likes.create.mockResolvedValue(like);

            expect(async () => {
                await likeThoughtUseCase(1, 1);
            }).not.toThrow(EXCEPTION.INVALID);
        });
        it.todo("Should not be able to like an invalid thought");
    });
    describe("removeLikeThoughtUseCase", () => {
        it.todo("Should be able to remove like in a thought");
        it.todo("Should not be able to remove like and invalid thought");
    });
});
