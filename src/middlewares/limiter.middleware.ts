import { NextFunction, Response } from "express";
import { addAction } from "../repositories/json.repository";
import { AuthenticatedRequest } from "./jwt.middleware";
import { logger } from "./logger.middleware";

export async function actionLimiter(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    if (!req.user) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }

    try {
        const external_id = Number(req.user.external_id);

        if (!await addAction(external_id, req.route)) {
                        logger.warn(`UserId ${external_id} has no actions left`);

            res.status(429).json({ message: "Daily action limit exceeded. You have used all 10 actions for today." });
            return;
        }

        next();
    } catch (error) {
        logger.error(error, "Error in action limiter middleware");
        res.status(500).json({ message: "Internal server error" });
        return;
    }
}
