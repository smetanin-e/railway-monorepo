import { z } from 'zod';

export const createWagonOwnerSchema = z.object({
  name: z.string().trim().min(1, { message: 'Название владельца вагона обязательно' }).max(50),
});

export type CreateWagonOwnerInput = z.infer<typeof createWagonOwnerSchema>;
