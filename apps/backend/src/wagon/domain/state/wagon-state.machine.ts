import {
  StateTransitionContext,
  StateTransitionResult,
  WagonStateSnapshot,
} from './wagon-state.types';

//TODO Добавить вес груза

//* Решает ЧТО будет

//!Этот способ не масштабируемый и при изменении нескольких свойств применится только первое
export class WagonStateMachine {
  static calculate(
    current: WagonStateSnapshot,
    input: Partial<WagonStateSnapshot>,
  ): StateTransitionResult {
    const next: WagonStateSnapshot = { ...current };
    let changed = false;

    // Сравниваем каждое поле из input с текущим состоянием
    for (const key in input) {
      const newValue = input[key as keyof WagonStateSnapshot];
      const currentValue = current[key as keyof WagonStateSnapshot];

      // Если значение изменилось — применяем его
      //   if (newValue !== undefined && newValue !== currentValue) {
      //     //TODO ПЕРЕПИСАТЬ
      //     next[key as keyof WagonStateSnapshot] = newValue;
      //     changed = true;
      //   }
    }

    if (changed) {
      return { type: 'CHANGE', next };
    }

    return { type: 'NO_CHANGE' };
  }
}
