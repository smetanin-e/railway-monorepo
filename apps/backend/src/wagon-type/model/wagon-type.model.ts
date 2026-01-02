import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Тип вагона' })
export class WagonTypeModel {
  @Field(() => String, { description: 'UUID типа вагона' })
  id!: string;

  @Field(() => String, { description: 'Название типа вагона' })
  name!: string;

  @Field(() => Date)
  createdAt!: Date;

  @Field(() => Date)
  updatedAt!: Date;
}
