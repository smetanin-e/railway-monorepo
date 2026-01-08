import z from 'zod';
import { OperationCategory } from '../enums/operation-category.enum';
import { OperationRole } from '../enums/operation-role.enum';

export const createOperationTypeSchema = z.object({
  name: z.string().trim().min(3, 'Название станции обязательно').max(255),
  normative: z
    .number('Норма должна быть числом')
    .nonnegative('Норма не может быть отрицательной')
    .max(99.99, 'Норма не может превышать 99.99'),
  category: z.enum(OperationCategory, 'Категория операции может быть только "ACTIVE" | "PASSIVE"'),
  role: z.enum(OperationRole, 'Категория операции может быть только "PRIMARY" | "SECONDARY"'),
});

export type CreateOperationTypeInput = z.infer<typeof createOperationTypeSchema>;
