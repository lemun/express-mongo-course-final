import { Schema, model, InferSchemaType } from "mongoose";

const UserSchema = new Schema({
    external_id: {
        type: Number,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    fullname: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    toJSON: { virtuals: false }
});

export type UserDocument = InferSchemaType<typeof UserSchema>;

export const UserModel = model<UserDocument>("User", UserSchema);