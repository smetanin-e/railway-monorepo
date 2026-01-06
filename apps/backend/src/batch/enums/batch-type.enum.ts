import { registerEnumType } from '@nestjs/graphql';
import { BatchType } from '@railway/shared';

registerEnumType(BatchType, {
  name: 'BatchType',
  description:
    'Тип партии (По накладной / по вагонному листу (внутреннее перемещение))',
});

export { BatchType };
