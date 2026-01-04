import { z } from 'zod';

export const createWagonTypeSchema = z.object({
  name: z.string().min(1, 'Название типа вагона обязательно').max(50).trim(),
  numberPrefix: z
    .string()
    .min(1, 'Префикс обязателен')
    .max(2, 'Префикс не может быть длиннее 2 символов')
    .regex(/^[1-9]{1,2}$/, 'Префикс должен состоять из 1–2 цифр от 1 до 9'),
});

export type CreateWagonTypeInput = z.infer<typeof createWagonTypeSchema>;
