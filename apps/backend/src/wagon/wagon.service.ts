import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Wagon } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateWagonInput } from './inputs/create-wagon.input';
import { handlePrismaError } from 'src/prisma/utils/prisma-error.util';
import { UpdateWagonInput } from './inputs/update-wagon.input';
import { WagonNumberValidator } from './domain/wagon-number.validator';

@Injectable()
export class WagonService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Wagon[]> {
    return await this.prisma.wagon.findMany({
      include: {
        type: true,
        owner: true,
      },
    });
  }

  async findOne(id: string): Promise<Wagon> {
    const wagon = await this.prisma.wagon.findUnique({
      where: { id },
      include: {
        type: true,
        owner: true,
      },
    });
    if (!wagon) {
      throw new NotFoundException('Вагон не найден');
    }
    return wagon;
  }

  async create(data: CreateWagonInput): Promise<Wagon> {
    try {
      const wagonType = await this.prisma.wagonType.findUnique({
        where: { id: data.typeId },
      });

      if (!wagonType) {
        throw new BadRequestException('Выбранный тип вагона не найден');
      }

      const isValidWagonNumber = WagonNumberValidator.validate(
        data.number,
        wagonType.numberPrefix,
        data.affiliationType,
      );

      if (!isValidWagonNumber) {
        throw new BadRequestException('Номер вагона не соответствует типу');
      }

      return await this.prisma.wagon.create({
        data: {
          number: data.number,
          affiliationType: data.affiliationType,
          typeId: data.typeId,
          ownerId: data.ownerId,
          barPackage: data.barPackage,
          capacity: data.capacity,
          volume: data.volume,
        },
        include: {
          owner: true,
          type: true,
        },
      });
    } catch (e) {
      handlePrismaError(e, {
        unique: 'Такой вагон уже существует',
        foreignKey: 'Указан несуществующий тип или владелец вагона',
      });
    }
  }

  //TODO Добавить условия (Если у вагона был рейс - запретить обновление. Вопрос по смене типа и владельца)
  //* Меняем только грузоподъемность, тара с бруса и объем?
  async update(id: string, data: UpdateWagonInput): Promise<Wagon> {
    try {
      return await this.prisma.wagon.update({
        where: { id },
        data,
        include: {
          owner: true,
          type: true,
        },
      });
    } catch (e) {
      handlePrismaError(e, {
        notFound: `Вагон с не найден`,
      });
    }
  }

  async delete(id: string): Promise<boolean> {
    const wagon = await this.findOne(id);

    //TODO Добавить условие (Если у вагона был рейс - запретить удаление!)

    await this.prisma.wagon.delete({
      where: { id: wagon.id },
    });
    return true;
  }
}
