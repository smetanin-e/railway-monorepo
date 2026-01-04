import { z } from 'zod';

export const createWagonOwnerSchema = z.object({
  name: z.string().min(1, 'Название владельца вагона обязательно').max(50).trim(),
});

export type CreateWagonOwnerInput = z.infer<typeof createWagonOwnerSchema>;
