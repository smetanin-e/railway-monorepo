import { registerEnumType } from '@nestjs/graphql';
import { OperationCode } from '@railway/shared';
registerEnumType(OperationCode, {
  name: 'OperationCode',
  description: 'Код операции "LOAD" | "UNLOAD"',
});

export { OperationCode };
