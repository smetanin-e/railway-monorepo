import { registerEnumType } from '@nestjs/graphql';
import { StationType } from '@prisma/client';

registerEnumType(StationType, {
  name: 'StationType',
  description: 'Тип станции (внутренняя / внешняя)',
});

export { StationType };
