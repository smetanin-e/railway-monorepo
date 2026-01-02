import { Field, ID, ObjectType } from '@nestjs/graphql';
import { WagonModel } from 'src/wagon/model/wagon.model';

@ObjectType({ description: 'Тип вагона' })
export class WagonTypeModel {
  @Field(() => ID, { description: 'UUID типа вагона' })
  id!: string;

  @Field(() => String, { description: 'Название типа вагона' })
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
