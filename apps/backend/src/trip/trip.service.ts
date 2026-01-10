import { BadRequestException, Injectable } from '@nestjs/common';
import { Trip } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TripService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Trip[]> {
    return await this.prisma.trip.findMany({
      include: { wagon: { select: { id: true, number: true } } },
    });
  }

  async findOne(id: string): Promise<Trip | null> {
    return await this.prisma.trip.findUnique({
      where: { id },
      include: {
        wagon: { select: { id: true, number: true } },
        wagonStates: {
          include: {
            station: true,
            wagonOperations: {
              select: {
                startedAt: true,
                endedAt: true,
                type: { select: { name: true } },
              },
            },
          },
          orderBy: { createdAt: 'desc' },
        },
      },
    });
  }

  //!Переделать(добавить input)
  async createForBatch(params: { batchId: string; wagonId: string }) {
    const batch = await this.prisma.batch.findUnique({
      where: { id: params.batchId },
    });

    if (!batch) {
      throw new BadRequestException('Партиня не найдена');
    }

    const wagon = await this.prisma.wagon.findUnique({
      where: { id: params.wagonId },
    });

    if (!wagon) {
      throw new BadRequestException('Вагон не найден');
    }

    const activeTrip = await this.prisma.trip.findFirst({
      where: { wagonId: wagon.id, finishedAt: null },
    });

    if (activeTrip) {
      throw new BadRequestException('Вагон уже находится в активном рейсе');
    }

    return this.prisma.trip.create({
      data: {
        wagonId: wagon.id,
        batchId: batch.id,
        startedAt: batch.startedAt,
      },
    });
  }
}
