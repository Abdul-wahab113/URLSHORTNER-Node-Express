import { z } from 'zod';

export const userSignupPostRequestBodySchema = z.object({
    firstname: z.string(),
    lastname: z.string(),
    email: z.string().email(),
    password: z.string().min(6, "Password must be at least 6 characters long")
});