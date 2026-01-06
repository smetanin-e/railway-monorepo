import { registerEnumType } from '@nestjs/graphql';
import { BatchDirection } from '@railway/shared';
registerEnumType(BatchDirection, {
  name: 'BatchDirection',
  description: 'Принадлежность партии (входящая / исходящая)',
});

export { BatchDirection };
