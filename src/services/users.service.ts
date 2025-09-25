import bcrypt from "bcrypt";
import { logger } from "../middlewares/logger.middleware";
import { UserDocument, UserModel } from "../models/user.schema"


export async function getAllUsers() {
    try {
        const users = await UserModel.find({}).lean().exec();

        return users.map((user) => ({ ...user, _id: user._id.toString() }));
    } catch (error) {
        logger.error(error, "Error getting all users");

        throw error;
    }
}

export async function getUserById(external_id: number) {
    try {
        const user = await UserModel.find({ external_id });
        if (!user) {
            logger.error("User not found");
            throw new Error("User not found");
        }

        return user;
    } catch (error) {
        logger.error(error, "Error getting user by id");
        throw error;
    }
}

export async function createNewUser(userData: UserDocument) {
    try {
        userData.password = await bcrypt.hash(userData.password, 10);

        return UserModel.create(userData);
    } catch (error) {
        logger.error(error, "Error creating user");
        throw error;
    }
}

export async function updateExistingUser(external_id: number, userData: Partial<Omit<UserDocument, 'external_id'>>) {
    try {
        const update: Partial<UserDocument> = {};
        if (typeof userData.username !== "undefined") update.username = userData.username;
        if (typeof userData.fullname !== "undefined") update.fullname = userData.fullname;
        if (typeof userData.age !== "undefined") update.age = userData.age;
        if (typeof userData.email !== "undefined") update.email = userData.email;
        if (typeof userData.password !== "undefined") {
            update.password = await bcrypt.hash(userData.password, 10);
        };

        return await UserModel.findOneAndUpdate({ external_id }, update);
    } catch (error) {
        logger.error(error, "Error updating user");
        throw error;
    }
}

export async function deleteExistingUser(external_id: number) {
    try {
        const user = await UserModel.find({ external_id });

        if (!user) {
            return false;
        }

        await UserModel.findOneAndDelete({ external_id });

        return true;
    } catch (error) {
        logger.error(error, "Error deleting user");
        throw error;
    }
}