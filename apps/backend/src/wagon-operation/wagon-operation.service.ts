import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateWagonOperationInput } from './inputs/wagon-operation.input';
import {
  OperationCategory,
  OperationCode,
  OperationConcurrency,
  OperationType,
  WagonState,
} from '@prisma/client';

@Injectable()
export class WagonOperationService {
  constructor(private readonly prisma: PrismaService) {}

  async create(input: CreateWagonOperationInput) {
    return this.prisma.$transaction(async (tx) => {
      // 1️⃣ Загружаем Trip + Wagon
      const trip = await tx.trip.findUnique({
        where: { id: input.tripId },
      });

      if (!trip) {
        throw new BadRequestException('Рейс не найден');
      }

      // 2️⃣ Загружаем тип операции
      const operationType = await tx.operationType.findUnique({
        where: { id: input.typeId },
      });

      if (!operationType) {
        throw new BadRequestException('Тип операции не найден');
      }

      // 3️⃣ Ищем currentState НА МОМЕНТ startedAt
      const currentState = await tx.wagonState.findFirst({
        where: {
          tripId: trip.id,
          startedAt: { lte: input.startedAt },
          OR: [{ endedAt: null }, { endedAt: { gt: input.startedAt } }],
        },
        orderBy: { startedAt: 'desc' },
      });

      if (!currentState) {
        throw new BadRequestException(
          'В данный период времени нет активного состояния вагона',
        );
      }

      // 4️⃣ Создаём операцию
      const operation = await tx.wagonOperation.create({
        data: {
          wagonStateId: currentState.id,
          typeId: input.typeId,
          startedAt: input.startedAt,
          endedAt: input.endedAt,
        },
      });

      // 5️⃣ Проверяем: меняет ли операция состояние
      const changesState =
        operationType.code &&
        operationType.concurrency === OperationConcurrency.EXCLUSIVE;

      if (!changesState) {
        return operation;
      }

      // 6️⃣ Закрываем currentState
      await tx.wagonState.update({
        where: { id: currentState.id },
        data: {
          endedAt: input.startedAt,
        },
      });

      // 7️⃣ Создаём новый WagonState (результат операции)
      await tx.wagonState.create({
        data: {
          wagonId: currentState.wagonId,
          tripId: currentState.tripId,
          stationId: input.stationId ? input.stationId : currentState.stationId,
          cargoId: input.cargoId ? input.cargoId : null,
          isEmpty: input.cargoId ? false : true,
          startedAt: input.startedAt,
        },
      });
    });
  }
}
