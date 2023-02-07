import { LoginDto } from "../dto/login.dto";
import { findUserByEmail } from "../repositories/user.repository";
import { EXCEPTION } from "../user.constraints";
import { compare } from "bcrypt";

async function loginUseCase(loginDto: LoginDto) {
    const user = await findUserByEmail(loginDto.email);

    if (!user) {
        throw new Error(EXCEPTION.INVALID);
    }

    const passwordCheck = await compare(loginDto.password, user.password);

    if (!passwordCheck) {
        throw new Error(EXCEPTION.AUTH);
    }

    return user;
}

export { loginUseCase };
