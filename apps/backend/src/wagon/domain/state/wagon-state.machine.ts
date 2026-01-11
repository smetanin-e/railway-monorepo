import {
  StateTransitionContext,
  StateTransitionResult,
} from './wagon-state.types';

//TODO Добавить вес груза

//* Решает ЧТО будет
export class WagonStateMachine {
  static calculate(ctx: StateTransitionContext): StateTransitionResult {
    const { current, input } = ctx;

    if (input.stationId && input.stationId !== current.stationId) {
      return {
        type: 'CHANGE',
        next: {
          stationId: input.stationId,
          cargoId: current.cargoId,
          isEmpty: current.isEmpty,
        },
      };
    }

    if (input.cargoId && current.isEmpty) {
      return {
        type: 'CHANGE',
        next: {
          stationId: input.stationId ?? current.stationId,
          cargoId: input.cargoId,
          isEmpty: false,
        },
      };
    }
    if (!input.cargoId && !current.isEmpty) {
      return {
        type: 'CHANGE',
        next: {
          stationId: input.stationId ?? current.stationId,
          cargoId: null,
          isEmpty: true,
        },
      };
    }

    return { type: 'NO_CHANGE' };
  }
}
