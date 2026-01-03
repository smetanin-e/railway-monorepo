import { Injectable, NotFoundException } from '@nestjs/common';
import { Station } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StationService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Station[]> {
    return await this.prisma.station.findMany();
  }

  async findOne(id: string): Promise<Station> {
    const station = await this.prisma.station.findUnique({
      where: { id },
    });
    if (!station) {
      throw new NotFoundException('Станция не найдена');
    }
    return station;
  }
}
