import z from 'zod';

export const updateWagonSchema = z
  .object({
    barPackage: z
      .number({ message: 'Тара с бруса должна быть числом' })
      .nonnegative({ message: 'Тара с бруса не может быть отрицательной' })
      .max(999.999, { message: 'Тара с бруса не может превышать 999.999' })
      .optional(),

    capacity: z
      .number({ message: 'Грузоподъемность должна быть числом' })
      .nonnegative({ message: 'Грузоподъемность не может быть отрицательной' })
      .max(999.999, { message: 'Грузоподъемность не может превышать 999.999' })
      .optional(),

    volume: z
      .number({ message: 'Объем должен быть числом' })
      .nonnegative({ message: 'Объем не может быть отрицательным' })
      .max(999.999, { message: 'Объем не может превышать 999.999' })
      .optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: 'Должно быть указано хотя бы одно поле для обновления',
  });

export type UpdateWagonInput = z.infer<typeof updateWagonSchema>;
