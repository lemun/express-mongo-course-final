import { Schema, model, InferSchemaType } from "mongoose";

const MovieSchema = new Schema({
    external_id: {
        type: Number,
        required: true,
        unique: true
    },
    movie_name: {
        type: String,
        required: true
    },
    movie_length: {
        type: Number,
        required: true
    },
    movie_picture: {
        type: String,
        required: true
    }
}, {
    id: false,
    toJSON: { virtuals: false }
});

export type MovieDocument = InferSchemaType<typeof MovieSchema>;

export const MovieModel = model<MovieDocument>("Movie", MovieSchema);