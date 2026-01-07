import { PrismaTransaction } from 'src/prisma/types/prisma.type';
import { BatchType } from '../enums/batch-type.enum';
import { WagonOwnership } from 'src/wagon/enums/wagon-ownership.enum';
import { BadRequestException } from '@nestjs/common';

export async function checkWagonOwnershipForBatchType(
  tx: PrismaTransaction,
  wagonIds: string[],
  batchType: BatchType,
) {
  const wagons = await tx.wagon.findMany({
    where: {
      id: { in: wagonIds },
    },
    select: {
      id: true,
      affiliationType: true,
    },
  });

  if (batchType === BatchType.ROUTE_SHEET) {
    const invalid = wagons.filter(
      (w) => w.affiliationType !== WagonOwnership.OWN,
    );

    if (invalid.length > 0) {
      throw new BadRequestException(
        'Для внутренней партии допускаются только внутренние вагоны',
      );
    }
  }

  if (batchType === BatchType.WAYBILL) {
    const invalid = wagons.filter(
      (w) => w.affiliationType !== WagonOwnership.LEASED,
    );

    if (invalid.length > 0) {
      throw new BadRequestException(
        'Для внешних партий допускаются только внешиние вагоны',
      );
    }
  }
}
