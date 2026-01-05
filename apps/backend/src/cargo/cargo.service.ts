import { Injectable, NotFoundException } from '@nestjs/common';
import { Cargo } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCargoInput } from './inputs/create-cargo.input';
import { handlePrismaError } from 'src/prisma/utils/prisma-error.util';

@Injectable()
export class CargoService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Cargo[]> {
    return await this.prisma.cargo.findMany(); //? В будущем добавить партии
  }

  async findOne(id: string): Promise<Cargo> {
    const cargo = await this.prisma.cargo.findUnique({
      where: { id },
    });
    if (!cargo) {
      throw new NotFoundException('Груз не найден');
    }
    return cargo;
  }

  async create(data: CreateCargoInput): Promise<Cargo> {
    try {
      return await this.prisma.cargo.create({
        data,
      });
    } catch (e) {
      handlePrismaError(e, {
        unique: 'Такой груз уже существует',
      });
    }
  }

  async delete(id: string): Promise<boolean> {
    const cargo = await this.findOne(id);

    //   //!Переделать на количество партий
    //   const wagonsCount = await this.prisma.wagon.count({
    //     where: { typeId: wagon.id },
    //   });

    //   if (wagonsCount > 0) {
    //     throw new BadRequestException(
    //       'Невозможно удалить владельца груза: к нему привязаны партии',
    //     );
    //   }

    await this.prisma.cargo.delete({
      where: { id: cargo.id },
    });
    return true;
  }
}
