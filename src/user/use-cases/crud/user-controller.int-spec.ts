import prisma from "../../../prisma";

describe("User module integration test", () => {
    describe("checkUserIsTheRightOne", () => {
        it.todo("Should be able to check if user is the right one");
        it.todo("Should not be able to pass invalid users");
    });
    describe("findOneUserController", () => {
        it.todo("Should be able to return an user");
        it.todo("Should not be able to return an invalid user");
    });
    describe("createUserController", () => {
        it.todo("Should be able to create an user");
        it.todo(
            "Should not be able to create an user with an already used email"
        );
    });
    describe("updateUserController", () => {
        it.todo("Should be able to update an user");
        it.todo("Should not be able to update an invalid user");
        it.todo("Should not be able to update another user account");
    });
    describe("deleteUserController", () => {
        it.todo("Should be able to delete an user");
        it.todo("Should not be able to delete an invalid user");
        it.todo("Should not be able to delete another user account");
    });
    describe("returnAllUsersThoughtsController", () => {
        it.todo("Should be able to return all users and all thoughts");
    });
    it("Should be able to acces the database", async () => {
        const u = await prisma.user.findMany();
        expect(async () => await prisma.user.findMany()).not.toThrow();
        expect(u).toHaveLength(0);
    });
});
