import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Station, StationType } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateStationInput } from './inputs/create-station.input';
import { handlePrismaError } from 'src/prisma/utils/prisma-error.util';

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

  async create(input: CreateStationInput): Promise<Station> {
    try {
      return await this.prisma.station.create({
        data: {
          name: input.name,
          type: input.type,
          code: input.type === StationType.EXTERNAL ? input.code : null,
        },
      });
    } catch (e) {
      handlePrismaError(e, {
        unique: 'Такая станция уже существует',
      });
    }
  }

  async delete(id: string): Promise<boolean> {
    const station = await this.findOne(id);

    //TODO Добавить обработку запрета на удаление при присутствии станции в операциях или партиях

    await this.prisma.station.delete({
      where: { id: station.id },
    });
    return true;
  }
}
