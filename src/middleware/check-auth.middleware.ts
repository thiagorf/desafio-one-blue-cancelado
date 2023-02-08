import { NextFunction, Request, Response } from "express";
import { MSG } from "../user/use-cases/user.constraints";

async function checkAuthMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (!req.session.email) {
        return res.status(401).json({
            msg: MSG.UNAUTHORIZED,
        });
    }

    return next();
}

export { checkAuthMiddleware };
