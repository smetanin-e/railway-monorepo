import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { OperationType } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOperationTypeInput } from './inputs/create-operation-type.input';
import { handlePrismaError } from 'src/prisma/utils/prisma-error.util';

@Injectable()
export class OperationTypeService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<OperationType[]> {
    return await this.prisma.operationType.findMany();
  }

  async findOne(id: string): Promise<OperationType> {
    const operationType = await this.prisma.operationType.findUnique({
      where: { id },
    });
    if (!operationType) {
      throw new NotFoundException('Тип операции не найден');
    }
    return operationType;
  }

  async create(data: CreateOperationTypeInput): Promise<OperationType> {
    try {
      return await this.prisma.operationType.create({
        data,
      });
    } catch (e) {
      handlePrismaError(e, {
        unique: 'Такой тип операции уже существует',
      });
    }
  }

  async delete(id: string): Promise<boolean> {
    const operationType = await this.findOne(id);

    const wagonOperationCount = await this.prisma.wagonOperation.count({
      where: { typeId: operationType.id },
    });

    if (wagonOperationCount > 0) {
      throw new BadRequestException(
        'Невозможно удалить тип операции: он используется с операциями с вагонами',
      );
    }

    await this.prisma.operationType.delete({
      where: { id: operationType.id },
    });
    return true;
  }
}
