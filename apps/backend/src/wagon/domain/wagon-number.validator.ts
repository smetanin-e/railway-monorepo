export class WagonNumberValidator {
  static validate(number: string, numberPrefix: string): boolean {
    // numberPrefix = "34" → номер должен начинаться с 3 или 4
    const regex = new RegExp(`^[${numberPrefix}]\\d{7}$`);
    return regex.test(number);
  }
}
