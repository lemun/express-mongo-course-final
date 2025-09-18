import { Schema, model, InferSchemaType } from "mongoose";

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
}, {
    id: false,
    toJSON: { virtuals: false }
});

export type UserDocument = InferSchemaType<typeof UserSchema>;

export const UserModel = model<UserDocument>("User", UserSchema);