import { z } from 'zod';

export const updateWagonTypeSchema = z.object({
  id: z.uuid({ message: 'Некорректный формат идентификатора (UUID)' }),
  name: z.string().min(1, 'Название типа вагона обязательно').max(50).trim(),
});

export type UpdateWagonTypeInput = z.infer<typeof updateWagonTypeSchema>;
