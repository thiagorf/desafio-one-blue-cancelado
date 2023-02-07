import { Request, Response } from "express";
import { LoginDto } from "../dto/login.dto";
import { MSG } from "../user.constraints";
import { loginUseCase } from "./auth-domain";

async function loginController(req: Request, res: Response) {
    const dto: LoginDto = req.body;

    const user = await loginUseCase(dto);

    req.session.email = user.email;
    req.session.save((err) => console.log(err));

    return res.status(201).json({
        msg: MSG.LOGIN,
    });
}

async function logoutController(req: Request, res: Response) {
    req.session.destroy(() => console.log("Destroyed"));

    res.clearCookie("sid", {
        httpOnly: true,
    });

    return res.json({
        msg: MSG.LOGOUT,
    });
}

export { loginController, logoutController };
