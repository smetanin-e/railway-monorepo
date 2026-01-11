import { WagonStateSnapshot } from './wagon-state.types';

export function asserWagonState(snapshot: WagonStateSnapshot) {
  if (snapshot.isEmpty && snapshot.cargoId) {
    throw new Error('Пустой вагон не должен иметь груз');
  }

  if (!snapshot.isEmpty && !snapshot.cargoId) {
    throw new Error('Загруженный вагон должен иметь груз');
  }
}
