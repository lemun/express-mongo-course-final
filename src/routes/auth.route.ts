import { Router } from "express";
import { login, register, profile } from "../controllers/auth.controller";
import { authenticateToken } from "../middleware/jwt.middleware";

const authRouter = Router();

authRouter.post('/login', login);
authRouter.post('/register', register);
authRouter.get('/profile', authenticateToken, profile);

export default authRouter;