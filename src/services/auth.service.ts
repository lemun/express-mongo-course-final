import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel, UserDocument } from "../schemas/user.schema";
import { logger } from "../middleware/logger.middleware";
import { assertEnvironment } from "../utils/utils";

export async function registerUser(userData: UserDocument): Promise<{ message: string }> {
    try {
        userData.password = await bcrypt.hash(userData.password, 10);
        await UserModel.create(userData);

        return { message: "User successfully registered" };
    } catch (error) {
        logger.error(error, "Error creating user");
        throw error;
    }
}

export async function loginUser(username: string, password: string): Promise<any> {
    try {
        const user = await UserModel.findOne({ username });
        if (!user) {
            logger.error("User not found");
            throw new Error("User not found");
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            logger.error("Invalid password");
            throw new Error("Invalid password");
        }

        const token = jwt.sign({ id: user._id, username: user.username }, assertEnvironment("JWT_SECRET"), { expiresIn: '24h' });
        return { token: token };
    } catch (error) {
        logger.error(error, "Error logging in user");
        throw error;
    }
}