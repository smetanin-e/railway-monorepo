import { z } from 'zod';
import { BatchDirection, BatchType } from '../enums/batch.enum';

export const creaBatchSchema = z.object({
  documentNumber: z
    .string()
    .trim()
    .min(1, 'Номер документа обязателен')
    .max(12, 'Номер документа слишком длинный'),

  direction: z.enum(BatchDirection),

  type: z.enum(BatchType),

  startedAt: z.coerce.date({ message: 'Некорректная дата начала партии' }),

  fromStationId: z.uuid('Некорректный идентификатор станции отправления'),

  toStationId: z.uuid('Некорректный идентификатор станции назначения'),

  cargoOwnerId: z.uuid('Некорректный идентификатор владельца груза'),

  cargoId: z.uuid('Некорректный идентификатор груза'),

  wagonIds: z.array(z.uuid()).min(1, 'Необходимо указать хотя бы один вагон'),
});

export type CreateBatchInput = z.infer<typeof creaBatchSchema>;
