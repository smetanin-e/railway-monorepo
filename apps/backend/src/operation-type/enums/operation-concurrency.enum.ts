import { registerEnumType } from '@nestjs/graphql';
import { OperationConcurrency } from '@railway/shared';
registerEnumType(OperationConcurrency, {
  name: 'OperationConcurrency',
  description: 'Конкурентность выполнения операций "EXCLUSIVE" | "PARALLEL"',
});

export { OperationConcurrency };
