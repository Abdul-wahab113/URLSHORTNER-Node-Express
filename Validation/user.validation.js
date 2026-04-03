import { z } from 'zod';

export const userSignupPostRequestBodySchema = z.object({
    firstname: z.string(),
    lastname: z.string().optional(),
    email: z.string().email(),
    password: z.string().min(4, "Password must be at least 6 characters long")
});

export const userLoginPostRequestBodySchemea = z.object({
    email: z.string().email(),
    password: z.string().min(4, "Password must be at least 6 characters long")
});