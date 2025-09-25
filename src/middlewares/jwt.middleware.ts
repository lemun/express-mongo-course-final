import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { assertEnvironment } from "../utils/utils";

export interface AuthenticatedRequest extends Request {
    user?: {
        external_id: string;
        username: string;
    };
}

export async function authenticateToken(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    const cookie = req.headers.cookie;

    if (!cookie) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }

    try {
        const token = cookie.slice(4);
        const decoded = jwt.verify(token, assertEnvironment("JWT_SECRET")) as any;

        let external_id: number;

        if (typeof decoded.id === 'string' && decoded.id.length === 24) {
            const { UserModel } = await import('../models/user.schema');
            const user = await UserModel.findById(decoded.id);
            if (!user) {
                throw new Error('User not found');
            }
            external_id = user.external_id;
        } else {
            external_id = Number(decoded.id);
        }

        req.user = { external_id: external_id.toString(), username: decoded.username };
        next();
    } catch (error) {
        res.status(403).json({ message: "Invalid or expired token" });
        return;
    }
}