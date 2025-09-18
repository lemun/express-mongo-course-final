import { Router } from "express";
import { login, register, test } from "../controllers/auth.controller";
import { authenticateToken } from "../middleware/jwt.middleware";

const authRouter = Router();

authRouter.post('/login', login);
authRouter.post('/register', register);
authRouter.get('/test', authenticateToken, test);

export default authRouter;