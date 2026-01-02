import { Injectable, NotFoundException } from '@nestjs/common';
import { WagonOwner } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateWagonOwnerInput } from './inputs/create-wagon-owner.input';
import { handlePrismaError } from 'src/prisma/utils/prisma-error.util';
import { UpdateWagonOwnerInput } from './inputs/update-wagon-owner.input';

@Injectable()
export class WagonOwnerService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<WagonOwner[]> {
    return await this.prisma.wagonOwner.findMany();
  }

  async findOne(id: string): Promise<WagonOwner> {
    const wagonOwner = await this.prisma.wagonOwner.findUnique({
      where: { id },
    });
    if (!wagonOwner) {
      throw new NotFoundException('Собственник вагона не найден');
    }
    return wagonOwner;
  }

  async create(
    createWagonOwneIrnput: CreateWagonOwnerInput,
  ): Promise<WagonOwner> {
    try {
      return await this.prisma.wagonOwner.create({
        data: createWagonOwneIrnput,
      });
    } catch (e) {
      handlePrismaError(e, {
        unique: 'Такой собственник уже существует',
      });
    }
  }

  async update(
    updateWagonOwnerInput: UpdateWagonOwnerInput,
  ): Promise<WagonOwner> {
    const { id, name } = updateWagonOwnerInput;
    try {
      return await this.prisma.wagonOwner.update({
        where: { id },
        data: { name },
      });
    } catch (e) {
      handlePrismaError(e, {
        unique: `Собственник вагона с именем "${name}" уже существует`,
        notFound: `Запись с id=${id} не найдена`,
      });
    }
  }

  async delete(id: string): Promise<boolean> {
    const wagonOwner = await this.findOne(id);

    await this.prisma.wagonOwner.delete({
      where: { id: wagonOwner.id },
    });
    return true;
  }
}
