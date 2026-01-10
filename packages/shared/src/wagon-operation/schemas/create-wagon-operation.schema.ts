import z from 'zod';

export const createWagonOperationSchema = z.object({
  tripId: z.uuid({ message: 'ID рейса должен быть валидным UUID' }),

  typeId: z.uuid({ message: 'ID типа операции должен быть валидным UUID' }),

  cargoId: z.uuid({ message: 'ID груза должен быть валидным UUID' }).optional(),

  stationId: z.uuid({ message: 'ID станции должен быть валидным UUID' }),

  startedAt: z.coerce.date({ message: 'Дата и время начала операции должны быть валидной датой' }),

  endedAt: z.coerce
    .date({ message: 'Дата и время окончания операции должны быть валидной датой' })
    .optional(),
});

export type CreateWagonOperationInput = z.infer<typeof createWagonOperationSchema>;
