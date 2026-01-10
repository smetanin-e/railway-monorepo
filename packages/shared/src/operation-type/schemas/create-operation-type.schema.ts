import z from 'zod';
import { OperationCategory } from '../enums/operation-category.enum';
import { OperationConcurrency } from '../enums/operation-concurrency.enum';
import { OperationCode } from '../enums/operation-code.enum';

export const createOperationTypeSchema = z.object({
  name: z.string().trim().min(3, 'Название станции обязательно').max(255),
  normative: z
    .number('Норма должна быть числом')
    .nonnegative('Норма не может быть отрицательной')
    .max(99.99, 'Норма не может превышать 99.99'),
  category: z.enum(OperationCategory, 'Категория операции может быть только "ACTIVE" | "PASSIVE"'),
  concurrency: z.enum(
    OperationConcurrency,
    'Категория операции может быть только "EXCLUSIVE" | "PARALLEL"',
  ),
  code: z.enum(OperationCode, 'Код операции может быть только "LOAD" | "UNLOAD"').optional(),
});

export type CreateOperationTypeInput = z.infer<typeof createOperationTypeSchema>;
