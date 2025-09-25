import { logger } from "../middlewares/logger.middleware";
import { MovieDocument, MovieModel } from "../models/movie.schema";

export async function getAllMovies() {
    try {
        const movies = await MovieModel.find({}).lean().exec();

        return movies.map((movie) => ({ ...movie, _id: movie._id.toString() }));
    } catch (error) {
        logger.error(error, "Error getting all movies");

        throw error;
    }
}

export async function getMovieById(external_id: number) {
    try {
        const movie = await MovieModel.find({ external_id });
        if (!movie) {
            logger.error("movie not found");
            throw new Error("Movie not found");
        }

        return movie;
    } catch (error) {
        logger.error(error, "Error getting movie by id");
        throw error;
    }
}

export async function createNewMovie(movieData: MovieDocument) {
    try {
        return MovieModel.create(movieData);
    } catch (error) {
        logger.error(error, "Error creating movie");
        throw error;
    }
}

export async function updateExistingMovie(external_id: number, movieData: Partial<Omit<MovieDocument, 'external_id'>>) {
    try {
        const update: Partial<MovieDocument> = {};
        if (typeof movieData.movie_name !== "undefined") update.movie_name = movieData.movie_name;
        if (typeof movieData.movie_length !== "undefined") update.movie_length = movieData.movie_length;
        if (typeof movieData.movie_picture !== "undefined") update.movie_picture = movieData.movie_picture;

        return await MovieModel.findOneAndUpdate({ external_id }, update);
    } catch (error) {
        logger.error(error, "Error updating movie");
        throw error;
    }
}

export async function deleteExistingMovie(external_id: number) {
    try {
        const movie = await MovieModel.find({ external_id });

        if (!movie) {
            return false;
        }

        await MovieModel.findOneAndDelete({ external_id });

        return true;
    } catch (error) {
        logger.error(error, "Error deleting movie");
        throw error;
    }
}