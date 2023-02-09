import { prismaMock } from "../../../../singleton";
import { EXCEPTION } from "../user.constraints";
import { loginUseCase } from "./auth-domain";
import b from "bcrypt";

const user = {
    id: 1,
    name: "john",
    email: "john@gmail.com",
    password: "1234",
};

const loginDto = {
    email: "john@gmail.com",
    password: "1234",
};

describe("Auth Domain", () => {
    afterAll(() => {
        jest.clearAllMocks();
    });
    it("Should be able to proceed with the authentication", () => {
        prismaMock.user.findUnique.mockResolvedValue(user);
        jest.spyOn(b, "compare").mockImplementationOnce(async () => true);

        expect(async () => {
            await loginUseCase(loginDto);
        }).not.toThrow(EXCEPTION.INVALID);
    });
    it("Should not be able to authenticate an invalid user", () => {
        prismaMock.user.findUnique.mockResolvedValue(null);

        expect(async () => {
            await loginUseCase(loginDto);
        }).rejects.toThrow(EXCEPTION.INVALID);
    });
    it("Should not be able to authenticate with and invalid password", () => {
        prismaMock.user.findUnique.mockResolvedValue(user);
        expect(async () => {
            await loginUseCase(loginDto);
        }).rejects.toThrow(EXCEPTION.AUTH);
    });
});
