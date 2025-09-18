import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { assertEnvironment } from "../utils/utils";

export interface AuthenticatedRequest extends Request {
    user?: {
        id: string;
        username: string;
        password: string;
    };
}

export function authenticateToken(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
    const cookie = req.headers.cookie;

    if (!cookie) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }

    try {
        const token = cookie.slice(4);
        const decoded = jwt.verify(token, assertEnvironment("JWT_SECRET")) as any;
        req.user = { id: decoded.id, username: decoded.username, password: decoded.password };
        console.log(decoded.password);
        next();
    } catch (error) {
        res.status(403).json({ message: "Invalid or expired token" });
        return;
    }
}