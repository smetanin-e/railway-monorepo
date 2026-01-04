import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateWagonTypeInput } from './inputs/create-wagon-type.input';
import { WagonType } from '@prisma/client';
import { handlePrismaError } from 'src/prisma/utils/prisma-error.util';
import { UpdateWagonTypeInput } from '@railway/shared';

@Injectable()
export class WagonTypeService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<WagonType[]> {
    return await this.prisma.wagonType.findMany({
      include: { wagons: { include: { owner: true } } },
    });
  }

  async findOne(id: string): Promise<WagonType> {
    const wagonType = await this.prisma.wagonType.findUnique({
      where: { id },
    });
    if (!wagonType) {
      throw new NotFoundException('Тип вагона не найден');
    }
    return wagonType;
  }

  async create(data: CreateWagonTypeInput): Promise<WagonType> {
    try {
      return await this.prisma.wagonType.create({
        data,
      });
    } catch (e) {
      handlePrismaError(e, {
        unique: 'Такой тип вагона уже существует',
      });
    }
  }

  async update(id: string, data: UpdateWagonTypeInput): Promise<WagonType> {
    try {
      return await this.prisma.wagonType.update({
        where: { id },
        data: data,
      });
    } catch (e) {
      handlePrismaError(e, {
        unique: `Тип вагона с именем "${data.name}" уже существует`,
        notFound: `Запись с id=${id} не найдена`,
      });
    }
  }

  async delete(id: string): Promise<boolean> {
    const wagonType = await this.findOne(id);

    const wagonsCount = await this.prisma.wagon.count({
      where: { typeId: wagonType.id },
    });

    if (wagonsCount > 0) {
      throw new BadRequestException(
        'Невозможно удалить тип вагона: к нему привязаны вагоны',
      );
    }

    await this.prisma.wagonType.delete({
      where: { id: wagonType.id },
    });
    return true;
  }
}
