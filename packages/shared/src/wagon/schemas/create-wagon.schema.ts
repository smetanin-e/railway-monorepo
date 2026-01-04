import { z } from 'zod';

export const createWagonSchema = z.object({
  number: z
    .string()
    .length(8, 'Номер вагона должен быть ровно 8 цифр')
    .regex(/^\d{8}$/, 'Номер вагона должен содержать только цифры')
    .trim(),
  typeId: z
    .uuid({ message: 'Некорректный формат идентификатора (UUID)' })
    .min(1, 'Тип вагона обязателен'),
  ownerId: z
    .uuid({ message: 'Некорректный формат идентификатора (UUID)' })
    .min(1, 'Владелец вагона обязателен'),
  barPackage: z
    .number('Тара с бруса должна быть числом')
    .nonnegative('Тара с бруса не может быть отрицательной')
    .max(999.999, 'Тара с бруса не может превышать 999.999'),

  capacity: z
    .number('Грузоподъемность должна быть числом')
    .nonnegative('Грузоподъемность не может быть отрицательной')
    .max(999.999, 'Грузоподъемность не может превышать 999.999'),

  volume: z
    .number('Объем должен быть числом')
    .nonnegative('Объем не может быть отрицательным')
    .max(999.999, 'Объем не может превышать 999.999'),
});

export type CreateWagonInput = z.infer<typeof createWagonSchema>;
