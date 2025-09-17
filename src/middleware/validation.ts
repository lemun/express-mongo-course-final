import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { logger } from "./logger.middleware";

export function validateBody(schema: z.ZodSchema) {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse(req.body);
            next();
        } catch (error) {
            if (error instanceof z.ZodError) {
                const errorMessages = error.issues.map((err: any) => `${err.path.join('.')}: ${err.message}`);
                logger.error(error, "Validation error");
                res.status(400).json({ 
                    message: "Validation failed", 
                    errors: errorMessages 
                });
                return;
            }
            
            logger.error(error, "Unexpected validation error");
            res.status(500).json({ message: "Internal server error" });
        }
    };
}
