import { z } from 'zod';

export const createCargoOwnerSchema = z.object({
  name: z.string().trim().min(3, { message: 'Название владельца груза обязательно' }).max(50),
});

export type CreateCargoOwnerInput = z.infer<typeof createCargoOwnerSchema>;
