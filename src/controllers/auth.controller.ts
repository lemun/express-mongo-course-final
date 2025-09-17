import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/auth.service";
import { logger } from "../middleware/logger.middleware";
import { User, RegisterInput, LoginInput } from "../schemas/user.schema";
import { AuthenticatedRequest } from "../middleware/jwt.middleware";

export async function register(req: Request, res: Response) {
    const { username, password } = req.body as RegisterInput;

    await registerUser({ username, password }).then((result) => {
        res.status(201).json(result);
    }).catch((error: Error) => {
        res.status(500).json({ message: "failed to register user" });
        logger.error(error, "Error registering user");

        return;
    });
}

export async function login(req: Request, res: Response) {
    const { username, password } = req.body as LoginInput;

    await loginUser({ username, password }).then((user: User) => {
        res.status(200).json(user);
    }).catch((error: Error) => {
        res.status(500).json({ message: "failed to login user" });
        logger.error(error, "Error logging in user");

        return;
    });
}

export async function profile(req: AuthenticatedRequest, res: Response) {
    res.status(200).json({
        message: "Profile data",
        user: req.user
    });
}