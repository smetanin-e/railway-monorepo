import { z } from 'zod';

export const createCargoSchema = z.object({
  name: z.string().trim().min(3, { message: 'Название груза обязательно' }).max(50),
  nationalCode: z
    .string()
    .trim()
    .length(8, { message: 'Код груза ГНГ должен быть ровно 8 цифр' })
    .regex(/^\d{8}$/, { message: 'Код груза ГНГ должен содержать только цифры' }),
  internationalCode: z
    .string()
    .trim()
    .length(6, { message: 'Код груза ЕГСНГ должен быть ровно 6 цифр' })
    .regex(/^\d{6}$/, { message: 'Код груза ЕГСНГ должен содержать только цифры' }),
});

export type CreateCargoInput = z.infer<typeof createCargoSchema>;
