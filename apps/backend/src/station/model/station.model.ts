import { Field, ObjectType } from '@nestjs/graphql';
import { StationType } from '../enums/station-type.enum';
import { BaseModel } from 'src/common/base.model';
import { WagonStateModel } from 'src/wagon-state/model/wagon-state.model';
import { BatchModel } from 'src/batch/model/batch.model';

@ObjectType({ description: 'Модель станции' })
export class StationModel extends BaseModel {
  @Field(() => String, { description: 'Название станции (строка)' })
  name!: string;

  @Field(() => String, {
    nullable: true,
    description: 'Код станции (только для внешних станций)',
  })
  code?: string;

  @Field(() => StationType, {
    description: 'Тип станции (внешняя или внутренняя)',
  })
  type!: StationType;

  @Field(() => [WagonStateModel], {
    description: 'Связь с состояниями вагона',
  })
  wagonStates!: WagonStateModel[];

  @Field(() => [BatchModel], {
    description: 'Связь с партиями, отправленными со станции',
  })
  fromBatches!: BatchModel[];

  @Field(() => [BatchModel], {
    description: 'Связь с партиями, прибывшими на станцию',
  })
  toBatches!: BatchModel[];
}
