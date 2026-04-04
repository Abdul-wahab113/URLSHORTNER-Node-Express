import { z } from 'zod';

export const urlShortnerPostRequestSchema = z.object({
    shortCode: z.string().optional(),
    targetURL: z.string().url()
});