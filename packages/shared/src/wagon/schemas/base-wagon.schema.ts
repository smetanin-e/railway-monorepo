import z from 'zod';

export const basedWagonSchema = z.object({
  typeId: z.uuid({ message: 'Некорректный формат идентификатора (UUID)' }),

  ownerId: z.uuid({ message: 'Некорректный формат идентификатора (UUID)' }),
  barPackage: z
    .number({ message: 'Тара с бруса должна быть числом' })
    .nonnegative({ message: 'Тара с бруса не может быть отрицательной' })
    .max(999.999, { message: 'Тара с бруса не может превышать 999.999' }),

  capacity: z
    .number({ message: 'Грузоподъемность должна быть числом' })
    .nonnegative({ message: 'Грузоподъемность не может быть отрицательной' })
    .max(999.999, { message: 'Грузоподъемность не может превышать 999.999' }),

  volume: z
    .number({ message: 'Объем должен быть числом' })
    .nonnegative({ message: 'Объем не может быть отрицательным' })
    .max(999.999, { message: 'Объем не может превышать 999.999' }),
});
