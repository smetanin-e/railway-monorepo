import { z } from 'zod';

export const updateWagonOwnerSchema = z.object({
  id: z.uuid({ message: 'Некорректный формат идентификатора (UUID)' }),
  name: z.string().min(1, 'Название владельца вагона обязательно').max(50).trim(),
});

export type UpdateWagonOwnerInput = z.infer<typeof updateWagonOwnerSchema>;
