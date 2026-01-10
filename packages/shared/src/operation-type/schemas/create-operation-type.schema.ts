import z from 'zod';
import { OperationCategory } from '../enums/operation-category.enum';
import { OperationConcurrency } from '../enums/operation-concurrency.enum';
import { OperationCode } from '../enums/operation-code.enum';

export const createOperationTypeSchema = z.object({
  name: z.string().trim().min(3, { message: 'Название станции обязательно' }).max(50),
  normative: z
    .number({ message: 'Норма должна быть числом' })
    .nonnegative({ message: 'Норма не может быть отрицательной' })
    .max(99.99, { message: 'Норма не может превышать 99.99' }),
  category: z.enum(OperationCategory, {
    message: 'Категория операции может быть только "ACTIVE" | "PASSIVE"',
  }),
  concurrency: z.enum(OperationConcurrency, {
    message: 'Категория операции может быть только "EXCLUSIVE" | "PARALLEL"',
  }),
});

export type CreateOperationTypeInput = z.infer<typeof createOperationTypeSchema>;
