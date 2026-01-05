import { registerEnumType } from '@nestjs/graphql';
import { WagonOwnership } from '@railway/shared';
registerEnumType(WagonOwnership, {
  name: 'WagonOwnership',
  description: 'Принадлежность вагона (внутренний / арендованный)',
});

export { WagonOwnership };
