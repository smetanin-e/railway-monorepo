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
      if (newValue !== undefined && newValue !== currentValue) {
        //TODO ПЕРЕПИСАТЬ
        next[key as keyof WagonStateSnapshot] = newValue;
        changed = true;
      }
    }

    if (changed) {
      return { type: 'CHANGE', next };
    }

    return { type: 'NO_CHANGE' };
  }
}

//Пример
// import { WagonStateMachine } from './wagon-state.machine'

// const current = {
//   stationId: 'ST01',
//   cargoId: 'CARGO123',
//   isEmpty: false,
//   wagonWeight: 25,
//   cargoWeight: 15,
// }

// // Входит новая операция с новой станцией и новым грузом
// const input = {
//   stationId: 'ST02',
//   cargoId: 'CARGO456',
//   cargoWeight: 20,
// }

// const transition = WagonStateMachine.calculate(current, input)

// if (transition.type === 'CHANGE') {
//   console.log('Нужно создать новый WagonState:', transition.next)
// } else {
//   console.log('Состояние не изменилось')
// }
