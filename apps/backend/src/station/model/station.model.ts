import { Field, ObjectType } from '@nestjs/graphql';
import { StationType } from '../enums/station-type.enum';
import { BaseModel } from 'src/common/base.model';

@ObjectType({ description: 'Модель станции' })
export class StationModel extends BaseModel {
  @Field(() => String, { description: 'Название станции (строка)' })
  name!: string;

  @Field(() => String, {
    nullable: true,
    description: 'Код снанции (только для внешних станций)',
  })
  code!: string | null;

  //TODO Будет еще связь с партией и wagonState

  @Field(() => StationType, {
    description: 'Тип станции (внешняя или внутренняя)',
  })
  type!: StationType;
}
