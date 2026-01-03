import { z } from 'zod';
import { StationType } from '../enums/station-type.enum';

export const createStationSchema = z.discriminatedUnion('type', [
  // Схема для INTERNAL станций
  z.object({
    name: z.string().min(1, 'Название станции обязательно').max(255).trim(),
    type: z.literal(StationType.INTERNAL),
    code: z.null().optional(), // Только null или undefined
  }),

  // Схема для EXTERNAL станций
  z.object({
    name: z.string().min(1, 'Название станции обязательно').max(255).trim(),
    type: z.literal(StationType.EXTERNAL),
    code: z
      .string()
      .trim()
      .min(1, 'Код станции обязателен для внешних станций')
      .max(50, 'Код станции не должен превышать 50 символов'),
  }),
]);

export type CreateStationInput = z.infer<typeof createStationSchema>;
