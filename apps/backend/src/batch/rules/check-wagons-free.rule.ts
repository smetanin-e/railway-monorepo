import { ConflictException } from '@nestjs/common';
import { PrismaTransaction } from 'src/prisma/types/prisma.type';

export async function checkWagonsAreFree(
  tx: PrismaTransaction,
  wagonIds: string[],
) {
  const activeStates = await tx.wagonState.findMany({
    where: {
      wagonId: { in: wagonIds },
      endedAt: null,
    },
    select: { wagonId: true },
  });

  if (activeStates.length > 0) {
    throw new ConflictException(
      'Ошибка! Некоторые вагоны уже находятся в активном состоянии',
    );
  }
}
