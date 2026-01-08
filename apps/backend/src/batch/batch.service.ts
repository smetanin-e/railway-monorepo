import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBatchInput } from './inputs/create-batch.input';
import { Batch } from '@prisma/client';
import { validateBatchCreation } from './rules/batch.rules';

@Injectable()
export class BatchService {
  constructor(private readonly prisma: PrismaService) {}

  async create(input: CreateBatchInput): Promise<Batch> {
    return this.prisma.$transaction(async (tx) => {
      await validateBatchCreation(tx, {
        fromStationId: input.fromStationId,
        toStationId: input.toStationId,
        wagonIds: input.wagonIds,
        batchType: input.type,
        batchDirection: input.direction,
      });

      const batch = await tx.batch.create({
        data: {
          documentNumber: input.documentNumber,
          direction: input.direction,
          type: input.type,
          startedAt: input.startedAt,
          fromStationId: input.fromStationId,
          toStationId: input.toStationId,
          cargoOwnerId: input.cargoOwnerId,
          cargoId: input.cargoId,
        },
      });

      for (const wagonId of input.wagonIds) {
        const trip = await tx.trip.create({
          data: {
            batchId: batch.id,
            wagonId,
            startedAt: batch.startedAt,
          },
        });

        await tx.wagonState.create({
          data: {
            wagonId,
            batchId: trip.batchId,
            stationId: batch.fromStationId,
            tripId: trip.id,
            startedAt: batch.startedAt,
            cargoId: batch.cargoId,
          },
        });
      }

      return batch;
    });
  }
}
