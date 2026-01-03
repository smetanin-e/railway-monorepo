import { extend, Field, ID, ObjectType } from '@nestjs/graphql';
import { BaseModel } from 'src/common/base.model';
import { WagonModel } from 'src/wagon/model/wagon.model';

@ObjectType({ description: 'Тип вагона' })
export class WagonTypeModel extends BaseModel {
  @Field(() => String, { description: 'Название типа вагона' })
  name!: string;

  @Field(() => [WagonModel], {
    nullable: true,
    description: 'Связь с вагоноами',
  })
  wagons?: [WagonModel] | null;
}
