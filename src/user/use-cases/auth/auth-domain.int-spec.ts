import { hash } from "bcrypt";
import prisma from "../../../prisma";
import { EXCEPTION } from "../user.constraints";
import { loginUseCase } from "./auth-domain";

const loginDto = {
    email: "john@gmail.com",
    password: "1234",
};

const userDto = { ...loginDto, name: "john" };

describe("Auth Domain integration test", () => {
    beforeEach(async () => {
        await prisma.likes.deleteMany();
        await prisma.thoughts.deleteMany();
        await prisma.user.deleteMany();
    });
    it("Should be able to return an valid user for authentication", async () => {
        const hashedPassword = await hash(userDto.password, 10);
        const hashedPasswordUser = { ...userDto, password: hashedPassword };
        await prisma.user.create({ data: hashedPasswordUser });
        const sut = await loginUseCase(loginDto);

        expect(sut).toHaveProperty("id");
    }),
        it("Should not be able to authenticate an invalid user", () => {
            expect(async () => {
                await loginUseCase(loginDto);
            }).rejects.toThrow(EXCEPTION.INVALID);
        }),
        it("Should not be able to authenticate an user with an invalid password", async () => {
            const hashedPassword = await hash(userDto.password, 10);
            const hashedPasswordUser = { ...userDto, password: hashedPassword };
            await prisma.user.create({ data: hashedPasswordUser });
            expect(async () => {
                await loginUseCase({ ...loginDto, password: "223323476" });
            }).rejects.toThrow(EXCEPTION.AUTH);
        });
});
