import { Field, ID, ObjectType } from '@nestjs/graphql';
import { WagonModel } from 'src/wagon/model/wagon.model';

@ObjectType({ description: 'Владелец вагона' })
export class WagonOwnerModel {
  @Field(() => ID, { description: 'UUID владельца вагона' })
  id!: string;

  @Field(() => String, { description: 'Название владельца вагона' })
  name!: string;

  @Field(() => Date)
  createdAt!: Date;

  @Field(() => Date)
  updatedAt!: Date;

  @Field(() => [WagonModel], {
    nullable: true,
    description: 'Связь с вагоноами',
  })
  wagons?: [WagonModel] | null;
}
