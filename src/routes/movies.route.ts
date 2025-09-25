import { Router } from "express";
import { getMovies, getMovie, createMovie, updateMovie, deleteMovie } from "../controllers/movies.controller";
import { authenticateToken } from "../middlewares/jwt.middleware";
import { actionLimiter } from "../middlewares/limiter.middleware";

const moviesRouter = Router();

moviesRouter.get('/', authenticateToken, actionLimiter, getMovies);
moviesRouter.get('/:external_id', authenticateToken, actionLimiter, getMovie);
moviesRouter.post('/', authenticateToken, actionLimiter, createMovie);
moviesRouter.put('/:external_id', authenticateToken, actionLimiter, updateMovie);
moviesRouter.delete('/:external_id', authenticateToken, actionLimiter, deleteMovie);

export default moviesRouter;