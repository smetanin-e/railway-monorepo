import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateWagonTypeInput } from './inputs/create-wagon-type.input';
import { Prisma, WagonType } from '@prisma/client';
import { UpdateWagonTypeInput } from './inputs/update-wagon-type.input';

@Injectable()
export class WagonTypeService {
  constructor(private readonly prisma: PrismaService) {}

  private handlePrismaError(
    error: unknown,
    messages: {
      unique?: string;
      notFound?: string;
    },
  ) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002' && messages.unique) {
        throw new BadRequestException(messages.unique);
      }
      if (error.code === 'P2025' && messages.notFound) {
        throw new NotFoundException(messages.notFound);
      }
    }
    throw error;
  }

  async findAll(): Promise<WagonType[]> {
    return await this.prisma.wagonType.findMany();
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

  async create(createWagonTypeInput: CreateWagonTypeInput): Promise<WagonType> {
    return await this.prisma.wagonType
      .create({
        data: createWagonTypeInput,
      })
      .catch((e) => {
        this.handlePrismaError(e, {
          unique: 'Такой тип вагона уже существует',
        });
        throw e;
      });
  }

  async update(updateWagonTypeInput: UpdateWagonTypeInput): Promise<WagonType> {
    const { id, name } = updateWagonTypeInput;
    return this.prisma.wagonType
      .update({ where: { id }, data: { name } })
      .catch((e) => {
        this.handlePrismaError(e, {
          unique: `Тип вагона с именем "${name}" уже существует!`,
          notFound: `Запись с id=${id} не найдена`,
        });
        throw e;
      });
  }

  async delete(id: string): Promise<boolean> {
    const wagonType = await this.findOne(id);

    await this.prisma.wagonType.delete({
      where: { id: wagonType.id },
    });
    return true;
  }
}
