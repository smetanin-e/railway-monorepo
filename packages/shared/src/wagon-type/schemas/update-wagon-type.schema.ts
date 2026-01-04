import z from 'zod';
import { createWagonTypeSchema } from './create-wagon-type.schema';

export const updateWagonTypeSchema = createWagonTypeSchema.partial();

export type UpdateWagonTypeInput = z.infer<typeof updateWagonTypeSchema>;
