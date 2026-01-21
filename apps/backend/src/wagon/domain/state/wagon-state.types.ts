import { WagonState } from '@prisma/client';
import { CreateWagonOperationInput } from 'src/wagon-operation/inputs/create-wagon-operation.input';

export type StateTransitionContext = {
  current: WagonState;
  input: CreateWagonOperationInput;
};

export type WagonStateSnapshot = {
  stationId: string;
  cargoId: string | null;
  isEmpty: boolean;
  wagonWeight?: number;
  cargoWeight?: number | null;
};

export type StateTransitionResult =
  | { type: 'NO_CHANGE' }
  | { type: 'CHANGE'; next: WagonStateSnapshot };
