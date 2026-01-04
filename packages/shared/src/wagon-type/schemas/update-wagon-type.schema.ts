import z from 'zod';
import { createWagonTypeSchema } from './create-wagon-type.schema';

export const updateWagonTypeSchema = createWagonTypeSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: 'Должно быть указано хотя бы одно поле для обновления',
  });

export type UpdateWagonTypeInput = z.infer<typeof updateWagonTypeSchema>;
