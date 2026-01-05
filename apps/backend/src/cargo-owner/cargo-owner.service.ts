import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CargoOwner } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCargoOwnerInput } from './inputs/create-cargo-owner.input';
import { handlePrismaError } from 'src/prisma/utils/prisma-error.util';

@Injectable()
export class CargoOwnerService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<CargoOwner[]> {
    return await this.prisma.cargoOwner.findMany(); //! В будущем добавить партии
  }

  async findOne(id: string): Promise<CargoOwner> {
    const cargoOwner = await this.prisma.cargoOwner.findUnique({
      where: { id },
    });
    if (!cargoOwner) {
      throw new NotFoundException('Собственник груза не найден');
    }
    return cargoOwner;
  }

  async create(data: CreateCargoOwnerInput): Promise<CargoOwner> {
    try {
      return await this.prisma.cargoOwner.create({
        data,
      });
    } catch (e) {
      handlePrismaError(e, {
        unique: 'Такой владелец груза уже существует',
      });
    }
  }

  async delete(id: string): Promise<boolean> {
    const cargoOwner = await this.findOne(id);

    //   //!Переделать на количество партий
    //   const wagonsCount = await this.prisma.wagon.count({
    //     where: { typeId: wagonOwner.id },
    //   });

    //   if (wagonsCount > 0) {
    //     throw new BadRequestException(
    //       'Невозможно удалить владельца груза: к нему привязаны партии',
    //     );
    //   }

    await this.prisma.cargoOwner.delete({
      where: { id: cargoOwner.id },
    });
    return true;
  }
}
