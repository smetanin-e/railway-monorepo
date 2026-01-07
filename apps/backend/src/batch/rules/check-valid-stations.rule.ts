import { BadRequestException } from '@nestjs/common';
import { PrismaTransaction } from 'src/prisma/types/prisma.type';
import { BatchDirection } from '../enums/batch-direction.enum';
import { stationRules } from './station-direction.rules';

export async function checkValidStations(
  tx: PrismaTransaction,
  fromStationId: string,
  toStationId: string,
  batchDirection: BatchDirection,
) {
  const [fromStation, toStation] = await Promise.all([
    tx.station.findUnique({ where: { id: fromStationId } }),
    tx.station.findUnique({ where: { id: toStationId } }),
  ]);

  if (!fromStation || !toStation) {
    throw new BadRequestException(
      'Не удалось определить станцию входа или выхода',
    );
  }

  if (fromStationId === toStationId) {
    throw new BadRequestException('Станция входа и выхода не могут совпадать');
  }

  const rule = stationRules[batchDirection];

  if (fromStation.type !== rule.from || toStation.type !== rule.to) {
    throw new BadRequestException(
      `Для направления ${batchDirection} станция входа должна быть ${rule.from}, а выхода — ${rule.to}`,
    );
  }
}
