import { Request, Response } from "express";
import { logger } from "../middlewares/logger.middleware";
import { UserDocument } from "../models/user.schema";
import { loginUser, registerUser } from "../services/auth.service";

export async function register(req: Request, res: Response) {
    const user: UserDocument = req.body;

    await registerUser(user).then((result) => {
        res.status(201).json(result);
    }).catch((error: Error) => {
        res.status(500).json({ error: "failed to register user" });
        logger.error(error, "Error registering user");
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
        res.status(500).json({ error: "failed to login user" });
        logger.error(error, "Error logging in user");
    }
}
