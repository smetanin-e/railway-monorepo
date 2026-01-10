import { z } from 'zod';
import { StationType } from '../enums/station-type.enum';

export const createStationSchema = z.discriminatedUnion('type', [
  // Схема для INTERNAL станций
  z.object({
    name: z.string().trim().min(3, { message: 'Название станции обязательно' }).max(50),
    type: z.literal(StationType.INTERNAL),
    code: z.null().optional(), // Только null или undefined
  }),

  // Схема для EXTERNAL станций
  z.object({
    name: z.string().trim().min(1, { message: 'Название станции обязательно' }).max(50),
    type: z.literal(StationType.EXTERNAL),
    code: z
      .string()
      .trim()
      .min(3, { message: 'Для внешних станций обязателен код' })
      .max(50, { message: 'Код станции не должен превышать 50 символов' }),
  }),
]);

export type CreateStationInput = z.infer<typeof createStationSchema>;
