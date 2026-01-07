import { registerEnumType } from '@nestjs/graphql';
import { OperationCategory } from '@railway/shared';
registerEnumType(OperationCategory, {
  name: 'OperationCategory',
  description: 'Категория операции "ACTIVE" | "PASSIVE"',
});

export { OperationCategory };
