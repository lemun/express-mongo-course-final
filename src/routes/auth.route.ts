import { Router } from "express";
import { login, register, profile } from "../controllers/auth.controller";
import { validateBody } from "../middleware/validation.middleware";
import { loginSchema, registerSchema } from "../schemas/user.schema";
import { authenticateToken } from "../middleware/jwt.middleware";

const authRouter = Router();

authRouter.post('/login', validateBody(loginSchema), login);
authRouter.post('/register', validateBody(registerSchema), register);
authRouter.get('/profile', authenticateToken, profile);

export default authRouter;