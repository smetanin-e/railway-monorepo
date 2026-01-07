import { PrismaTransaction } from 'src/prisma/types/prisma.type';
import { BatchType } from '../enums/batch-type.enum';
import { checkWagonsAreFree } from './check-wagons-free.rule';
import { checkWagonOwnershipForBatchType } from './checkWagonOwnershipForBatchType';
import { checkValidStations } from './check-valid-stations.rule';
import { BatchDirection } from '../enums/batch-direction.enum';

export async function validateBatchCreation(
  tx: PrismaTransaction,
  params: {
    fromStationId: string;
    toStationId: string;
    wagonIds: string[];
    batchType: BatchType;
    batchDirection: BatchDirection;
  },
) {
  await checkValidStations(
    tx,
    params.fromStationId,
    params.toStationId,
    params.batchDirection,
  );
  await checkWagonsAreFree(tx, params.wagonIds);
  await checkWagonOwnershipForBatchType(tx, params.wagonIds, params.batchType);
}
