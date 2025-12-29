import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class WagonTypeModel {
  @Field(() => String)
  id!: string;

  @Field(() => String)
  name!: string;
}
