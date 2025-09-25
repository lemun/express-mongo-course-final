import { Router } from "express";
import { getUsers, getUser, createUser, updateUser, deleteUser } from "../controllers/users.controller";
import { authenticateToken } from "../middlewares/jwt.middleware";
import { actionLimiter } from "../middlewares/limiter.middleware";

const usersRouter = Router();

usersRouter.get('/', authenticateToken, actionLimiter, getUsers);
usersRouter.get('/:external_id', authenticateToken, actionLimiter, getUser);
usersRouter.post('/', authenticateToken, actionLimiter, createUser);
usersRouter.put('/:external_id', authenticateToken, actionLimiter, updateUser);
usersRouter.delete('/:external_id', authenticateToken, actionLimiter, deleteUser);

export default usersRouter;