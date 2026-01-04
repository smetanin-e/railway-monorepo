import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import z from 'zod';

@Injectable()
export class ZodValidationPipe<T> implements PipeTransform {
  constructor(private readonly schema: z.ZodType<T>) {}

  transform(value: unknown): T {
    const result = this.schema.safeParse(value);

    if (!result.success) {
      throw new BadRequestException({
        message: 'Ошибка валидации данных',
        errors: result.error.issues,
      });
    }

    return result.data;
  }
}
