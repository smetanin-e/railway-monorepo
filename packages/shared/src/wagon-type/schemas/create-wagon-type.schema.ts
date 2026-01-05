import { z } from 'zod';

export const createWagonTypeSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Название типа вагона обязательно')
    .max(50, 'Название типа вагона не может быть длиннее 50 символов'),
  numberPrefix: z
    .string()
    .min(1, 'Префикс обязателен')
    .max(2, 'Префикс не может быть длиннее 2 символов')
    .regex(/^\d{1,2}$/, 'Префикс должен состоять из 1–2 цифр'),
});

export type CreateWagonTypeInput = z.infer<typeof createWagonTypeSchema>;
