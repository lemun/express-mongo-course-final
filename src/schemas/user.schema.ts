import { z } from "zod";
import { Schema, model, InferSchemaType } from "mongoose";

export const userSchema = z.object({
    username: z.string()
        .min(3, "Username must be at least 3 characters")
        .max(20, "Username must be less than 20 characters")
        .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
    password: z.string()
        .min(6, "Password must be at least 6 characters")
        .max(50, "Password must be less than 50 characters")
});

export type User = z.infer<typeof userSchema>;
export type CreateUserInput = User;

export const registerSchema = userSchema;
export const loginSchema = z.object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(1, "Password is required")
});

const mongooseUserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 20,
        match: /^[a-zA-Z0-9_]+$/
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 50
    }
}, {
    id: false,
    toJSON: { virtuals: false }
});

export type UserDocument = InferSchemaType<typeof mongooseUserSchema>;
export const UserModel = model<User>("User", mongooseUserSchema);

export { loginSchema as LoginInput };
export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
