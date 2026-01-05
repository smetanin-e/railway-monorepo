import { z } from 'zod';
import { WagonOwnership } from '../enums/wagon-ownership.enum';
import { basedWagonSchema } from './base-wagon.schema';

export const createWagonSchema = z.discriminatedUnion('affiliationType', [
  basedWagonSchema.extend({
    affiliationType: z.literal(WagonOwnership.LEASED),
    number: z
      .string()
      .trim()
      .length(8, 'Номер вагона должен быть ровно 8 цифр')
      .regex(/^\d{8}$/, 'Номер вагона должен содержать только цифры'),
  }),

  basedWagonSchema.extend({
    affiliationType: z.literal(WagonOwnership.OWN),
    number: z
      .string()
      .trim()
      .min(3, 'Номер вагона должен иметь минимум 3 цифры')
      .max(8, 'Номер вагона не может быть длиннее 8 цифр')
      .regex(/^\d+$/, 'Номер вагона должен содержать только цифры'),
  }),
]);

export type CreateWagonInput = z.infer<typeof createWagonSchema>;
