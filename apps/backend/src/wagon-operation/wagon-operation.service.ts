import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateWagonOperationInput } from './inputs/create-wagon-operation.input';
import { PrismaTransaction } from 'src/prisma/types/prisma.type';
import { WagonState } from '@prisma/client';

@Injectable()
export class WagonOperationService {
  constructor(private readonly prisma: PrismaService) {}

  private async getTrip(tx: PrismaTransaction, tripId: string) {
    const trip = await tx.trip.findUnique({
      where: { id: tripId },
    });

    if (!trip) {
      throw new BadRequestException('Рейс не найден');
    }
    return trip;
  }

  private async getOperationType(tx: PrismaTransaction, typeId: string) {
    const type = await tx.operationType.findUnique({
      where: { id: typeId },
    });

    if (!type) {
      throw new BadRequestException('Тип операции не найден');
    }
    return type;
  }

  private async getCurrentState(
    tx: PrismaTransaction,
    tripId: string,
    at: Date,
  ) {
    const state = await tx.wagonState.findFirst({
      where: {
        tripId,
        startedAt: { lte: at },
        OR: [{ endedAt: null }, { endedAt: { gt: at } }],
      },
      orderBy: { startedAt: 'desc' },
    });

    if (!state) {
      throw new BadRequestException(
        'В данный период времени нет активного состояния вагона',
      );
    }

    return state;
  }

  private async getActiveOperations(
    tx: PrismaTransaction,
    wagonStateId: string,
    at: Date,
  ) {
    return tx.wagonOperation.findMany({
      where: {
        wagonStateId,
        startedAt: { lte: at },
        OR: [{ endedAt: null }, { endedAt: { gt: at } }],
      },
      include: { type: true },
    });
  }

  //Правило - потом вынести отдельно
  //   private checkExclusiveConcurrency(
  //     operationType: any,
  //     activeOperations: any[],
  //   ) {
  //     if (operationType.concurrency !== 'EXCLUSIVE') {
  //       return;
  //     }
  //   }

  // Изменилось ли состояние вагона
  //TODO Добавить вес груза позже.
  private doesOperationChangeState(
    current: WagonState,
    input: CreateWagonOperationInput,
  ): boolean {
    return !(
      current.stationId === input.stationId && current.cargoId === input.cargoId
    );
  }

  private async closeState(
    tx: PrismaTransaction,
    stateId: string,
    endedAt: Date,
  ) {
    await tx.wagonState.update({
      where: {
        id: stateId,
      },
      data: {
        endedAt,
      },
    });
  }

  private async createNewState(
    tx: PrismaTransaction,
    prev: WagonState,
    input: CreateWagonOperationInput,
  ) {
    await tx.wagonState.create({
      data: {
        wagonId: prev.wagonId,
        tripId: prev.tripId,
        stationId: input.stationId ?? prev.stationId,
        cargoId: input.cargoId ?? null,
        isEmpty: !input.cargoId,
        startedAt: input.startedAt,
      },
    });
  }

  async create(input: CreateWagonOperationInput) {
    return this.prisma.$transaction(async (tx) => {
      // Получаем рейс вагона
      const trip = await this.getTrip(tx, input.tripId);

      // Получаем тип операции
      await this.getOperationType(tx, input.typeId);

      // Получаем состояние вагона НА МОМЕНТ startedAt
      const currentState = await this.getCurrentState(
        tx,
        trip.id,
        input.startedAt,
      );

      //  Создаём операцию
      const operation = await tx.wagonOperation.create({
        data: {
          wagonStateId: currentState.id,
          typeId: input.typeId,
          startedAt: input.startedAt,
          endedAt: input.endedAt,
        },
      });

      // Проверяем: меняет ли операция состояние
      if (!this.doesOperationChangeState(currentState, input)) {
        return operation;
      }

      // Закрываем currentState
      await this.closeState(tx, currentState.id, input.startedAt);

      //  Создаём новый WagonState (результат операции)
      await this.createNewState(tx, currentState, input);
    });
  }
}
