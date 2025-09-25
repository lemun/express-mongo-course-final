import { Response } from "express";
import { getAllUsers, getUserById, createNewUser, updateExistingUser, deleteExistingUser } from "../services/users.service";
import { logger } from "../middlewares/logger.middleware";
import { UserDocument } from "../models/user.schema";
import { AuthenticatedRequest } from "../middlewares/jwt.middleware";

export async function getUsers(req: AuthenticatedRequest, res: Response) {
    try {
        const users = await getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: "failed getting all users" });
        logger.error(error, "Error getting all users");
    }
}

export async function getUser(req: AuthenticatedRequest, res: Response) {
    try {
        const user = await getUserById(Number(req.params.a));

        if (!user) {
            res.status(404).json({ error: "user not found" });
            logger.warn("User not found");

            return;
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: "failed to get user" });
        logger.error(error, "Error getting user");
    }
}

export async function createUser(req: AuthenticatedRequest, res: Response) {
    const userData: UserDocument = req.body;

    try {
        const newUser = await createNewUser(userData);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: "Failed to create user" });
        logger.error(error, "Error creating user");
    }
}

export async function updateUser(req: AuthenticatedRequest, res: Response) {
    const userData: UserDocument = req.body;

    try {
        const updatedUser = await updateExistingUser(Number(req.params.external_id), userData);

        if (!updatedUser) {
            res.status(404).json({ error: 'user not found' });

            return;
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: "failed to update user" });
        logger.error(error, "Error updating user");
    }
}

export async function deleteUser(req: AuthenticatedRequest, res: Response) {
    try {
        const isDeleted = await deleteExistingUser(Number(req.params.external_id));

        if (!isDeleted) {
            res.status(404).json({ message: 'user not found' });
        }

        res.status(200).json({ message: 'user deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete user' });
        logger.error(error, 'Error deleting user');
    }
}