import { registerEnumType } from '@nestjs/graphql';
import { OperationRole } from '@railway/shared';
registerEnumType(OperationRole, {
  name: 'OperationRole',
  description: 'Роль операции "PRIMARY" | "SECONDARY"',
});

export { OperationRole };
