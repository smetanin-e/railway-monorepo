import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class WagonOwnerModel {
  @Field(() => String)
  id!: string;

  @Field(() => String)
  name!: string;

  @Field(() => Date)
  createdAt!: Date;

  @Field(() => Date)
  updatedAt!: Date;
}
