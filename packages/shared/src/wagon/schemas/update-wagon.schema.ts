import z from 'zod';

export const updateWagonSchema = z
  .object({
    barPackage: z
      .number('Тара с бруса должна быть числом')
      .nonnegative('Тара с бруса не может быть отрицательной')
      .max(999.999, 'Тара с бруса не может превышать 999.999')
      .optional(),

    capacity: z
      .number('Грузоподъемность должна быть числом')
      .nonnegative('Грузоподъемность не может быть отрицательной')
      .max(999.999, 'Грузоподъемность не может превышать 999.999')
      .optional(),

    volume: z
      .number('Объем должен быть числом')
      .nonnegative('Объем не может быть отрицательным')
      .max(999.999, 'Объем не может превышать 999.999')
      .optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: 'Должно быть указано хотя бы одно поле для обновления',
  });

export type UpdateWagonInput = z.infer<typeof updateWagonSchema>;
