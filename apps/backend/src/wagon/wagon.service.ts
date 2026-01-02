import { Injectable, NotFoundException } from '@nestjs/common';
import { Wagon } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateWagonInput } from './inputs/create-wagon.input';
import { handlePrismaError } from 'src/prisma/utils/prisma-error.util';
import { UpdateWagonInput } from './inputs/update-wagon.input';

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

  async create(createWagonInput: CreateWagonInput): Promise<Wagon> {
    try {
      return await this.prisma.wagon.create({
        data: createWagonInput,
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

  async update(updateWagonInput: UpdateWagonInput): Promise<Wagon> {
    const { id, ...data } = updateWagonInput;
    try {
      return await this.prisma.wagon.update({
        where: { id },
        data,
      });
    } catch (e) {
      handlePrismaError(e, {
        unique: `Вагон номер "${data.number}" невозможно обновить. Причина: дублирование уникальных полей`,
        notFound: `Вагон с не найден`,
      });
    }
  }

  async delete(id: string): Promise<boolean> {
    const wagon = await this.findOne(id);

    await this.prisma.wagon.delete({
      where: { id: wagon.id },
    });
    return true;
  }
}
