import { registerEnumType } from '@nestjs/graphql';
import { StationType } from '@railway/shared';
registerEnumType(StationType, {
  name: 'StationType',
  description: 'Тип станции (внутренняя / внешняя)',
});

export { StationType };
