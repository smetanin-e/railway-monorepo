import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateWagonOperationInput } from './inputs/create-wagon-operation.input';
import { PrismaTransaction } from 'src/prisma/types/prisma.type';
import { WagonState } from '@prisma/client';
import { WagonStateMachine } from 'src/wagon/domain/state/wagon-state.machine';
import { WagonStateSnapshot } from 'src/wagon/domain/state/wagon-state.types';

//* Решает КОГДА и КАК сохранить
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
  private checkExclusiveConcurrency(
    operationType: any,
    activeOperations: any[],
  ) {
    if (operationType.concurrency !== 'EXCLUSIVE') {
      return;
    }

    const hasActiveExclusive = activeOperations.some(
      (op) => op.type.concurrency === 'EXCLUSIVE',
    );

    if (hasActiveExclusive) {
      throw new BadRequestException(
        'Нельзя начать EXCLUSIVE операцию, пока не завершена предыдущая',
      );
    }
  }

  private checkParallelConcurrency(
    operationType: any,
    activeOperations: any[],
  ) {
    if (operationType.concurrency !== 'PARALLEL') {
      return;
    }

    const hasActiveExclusive = activeOperations.some(
      (op) => op.type.concurrency === 'EXCLUSIVE',
    );

    if (hasActiveExclusive) {
      throw new BadRequestException(
        'PARALLEL операция не может выполняться во время EXCLUSIVE',
      );
    }
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
    snapshot: WagonStateSnapshot,
    startedAt: Date,
  ) {
    await tx.wagonState.create({
      data: {
        wagonId: prev.wagonId,
        tripId: prev.tripId,
        stationId: snapshot.stationId,
        cargoId: snapshot.cargoId,
        isEmpty: snapshot.isEmpty,
        startedAt,
      },
    });
  }

  async create(input: CreateWagonOperationInput) {
    return this.prisma.$transaction(async (tx) => {
      // Получаем рейс вагона
      const trip = await this.getTrip(tx, input.tripId);

      // Получаем тип операции
      const operationType = await this.getOperationType(tx, input.typeId);

      // Получаем состояние вагона НА МОМЕНТ startedAt
      const currentState = await this.getCurrentState(
        tx,
        trip.id,
        input.startedAt,
      );

      const activeOperations = await this.getActiveOperations(
        tx,
        currentState.id,
        input.startedAt,
      );

      //Проверяем параллельность
      this.checkExclusiveConcurrency(operationType, activeOperations);
      this.checkParallelConcurrency(operationType, activeOperations);

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
      const transition = WagonStateMachine.calculate({
        current: currentState,
        input,
      });

      if (transition.type === 'CHANGE') {
        // Закрываем currentState
        await this.closeState(tx, currentState.id, input.startedAt);

        //  Создаём новый WagonState (результат операции)
        await this.createNewState(
          tx,
          currentState,
          transition.next,
          input.startedAt,
        );
      }
    });
  }
}
