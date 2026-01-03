import { PipeTransform, Injectable } from '@nestjs/common';
import { createStationSchema } from '@railway/shared';
import { GraphQLError } from 'graphql';

@Injectable()
export class ValidateStationPipe implements PipeTransform {
  async transform(value: any) {
    const result = createStationSchema.safeParse(value);

    if (!result.success) {
      const zodError = result.error;
      const issues = zodError.issues || [];

      // Создаем понятные сообщения об ошибках
      const formattedErrors = issues.map((issue: any) => {
        const field = issue.path?.join('.') || 'unknown';

        // Кастомные сообщения для лучшего UX
        let message = issue.message;

        if (issue.code === 'invalid_type') {
          if (field === 'code' && value.type === 'EXTERNAL') {
            message = 'Для внешних станций обязателен код';
          }
        }

        return {
          field,
          message,
          code: issue.code,
        };
      });

      // Создаем GraphQL ошибку (не BadRequestException!)
      throw new GraphQLError('Ошибка валидации данных', {
        extensions: {
          code: 'BAD_REQUEST',
          errors: formattedErrors,
        },
      });
    }

    return result.data;
  }
}
