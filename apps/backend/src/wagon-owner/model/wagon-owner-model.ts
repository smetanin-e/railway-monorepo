import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BaseModel } from 'src/common/base.model';
import { WagonModel } from 'src/wagon/model/wagon.model';

@ObjectType({ description: 'Владелец вагона' })
export class WagonOwnerModel extends BaseModel {
  @Field(() => String, { description: 'Название владельца вагона' })
  name!: string;

  @Field(() => [WagonModel], {
    nullable: true,
    description: 'Связь с вагоноами',
  })
  wagons?: [WagonModel] | null;
}
