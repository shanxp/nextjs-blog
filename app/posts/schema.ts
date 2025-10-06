import { z } from 'zod';

export const createPostSchema = z.object({
    title: z.string().min(1, 'Title is required').max(255, 'Title cannot be too long, max 255 chars'),
    content: z.string().min(1, { message: 'Content cannot be empty'}),
})
