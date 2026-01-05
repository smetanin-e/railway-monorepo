import { WagonOwnership } from '../enums/wagon-ownership.enum';

export class WagonNumberValidator {
  static validate(
    number: string,
    numberPrefix: string,
    affiliationType: WagonOwnership,
  ): boolean {
    if (affiliationType === WagonOwnership.OWN) return true;

    // numberPrefix = "34" → номер должен начинаться с 3 или 4
    const regex = new RegExp(`^[${numberPrefix}]\\d{7}$`);
    return regex.test(number);
  }
}
