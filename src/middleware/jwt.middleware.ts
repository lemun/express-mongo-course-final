import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { assertEnvironment } from "../utils/utils";

export interface AuthenticatedRequest extends Request {
    user?: {
        id: string;
        username: string;
    };
}

export function authenticateToken(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
    const token = req.headers['x-access-token'] as string;

    if (!token) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }

    try {
        const decoded = jwt.verify(token, assertEnvironment("JWT_SECRET")) as any;
        req.user = { id: decoded.id, username: decoded.username };
        next();
    } catch (error) {
        res.status(403).json({ message: "Invalid or expired token" });
        return;
    }
}