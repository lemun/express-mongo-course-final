import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/auth.service";
import { logger } from "../middleware/logger.middleware";
import { UserDocument } from "../schemas/user.schema";
import { AuthenticatedRequest } from "../middleware/jwt.middleware";

export async function register(req: Request, res: Response) {
    const user: UserDocument = req.body;

    await registerUser(user).then((result) => {
        res.status(201).json(result);
    }).catch((error: Error) => {
        res.status(500).json({ message: "failed to register user" });
        logger.error(error, "Error registering user");

        return;
    });
}

export async function login(req: Request, res: Response) {
    const { username, password } = req.body;

    try {
        const { token } = await loginUser(username, password)

        res.cookie("jwt", token, {
            maxAge: 24 * 60 * 60 * 1000,
            sameSite: "strict",
            httpOnly: true,
        });
        res.status(200).json({ message: "user logged in" });
    } catch (error) {
        res.status(500).json({ message: "failed to login user" });
        logger.error(error, "Error logging in user");
    }
}

export async function test(req: AuthenticatedRequest, res: Response) {
    res.status(200).json({
        message: "jwt is valid",
        user: req.user
    });
}