import { Response } from "express";
import { getAllMovies, getMovieById, createNewMovie, updateExistingMovie, deleteExistingMovie } from "../services/movies.service";
import { logger } from "../middlewares/logger.middleware";
import { MovieDocument } from "../models/movie.schema";
import { AuthenticatedRequest } from "../middlewares/jwt.middleware";


export async function getMovies(req: AuthenticatedRequest, res: Response) {
    try {
        const movies = await getAllMovies();
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({ error: "failed getting all movies" });
        logger.error(error, "Error getting all movies");
    }
}

export async function getMovie(req: AuthenticatedRequest, res: Response) {
    try {
        const movie = await getMovieById(Number(req.params.external_id));

        if (!movie) {
            res.status(404).json({ error: "movie not found" });
            logger.warn("Movie not found");

            return;
        }

        res.status(200).json(movie);
    } catch (error) {
        res.status(500).json({ error: "failed to get movie" });
        logger.error(error, "Error getting movie");
    }
}

export async function createMovie(req: AuthenticatedRequest, res: Response) {
    const movieData: MovieDocument = req.body;

    try {
        const newMovie = await createNewMovie(movieData);
        res.status(201).json(newMovie);
    } catch (error) {
        res.status(500).json({ error: "failed to create movie" });
        logger.error(error, "Error creating movie");
    }
}


export async function updateMovie(req: AuthenticatedRequest, res: Response) {
    const movieData: MovieDocument = req.body;

    try {
        const updatedMovie = await updateExistingMovie(Number(req.params.external_id), movieData);

        if (!updatedMovie) {
            res.status(404).json({ error: "movie not found" });

            return;
        }

        res.status(200).json(updatedMovie);
    } catch (error) {
        res.status(500).json({ error: "failed to update movie" });
        logger.error(error, "Error updating movie");
    }
}

export async function deleteMovie(req: AuthenticatedRequest, res: Response) {
    try {
        const isDeleted = await deleteExistingMovie(Number(req.params.external_id));

        if (!isDeleted) {
            res.status(404).json({ message: "movie not found" });
        }

        res.status(200).json({ message: "movie deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "failed to delete movie" });
        logger.error(error, 'Error deleting movie');
    }
}