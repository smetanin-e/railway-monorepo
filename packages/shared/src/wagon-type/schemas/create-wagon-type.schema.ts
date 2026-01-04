import { z } from 'zod';

export const createWagonTypeSchema = z.object({
  name: z.string().min(1, 'Название типа вагона обязательно').max(50).trim(),
});

export type CreateWagonTypeInput = z.infer<typeof createWagonTypeSchema>;
