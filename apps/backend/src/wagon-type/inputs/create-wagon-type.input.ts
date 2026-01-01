import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateWagonTypeInput {
  @Field(() => String)
  name!: string;
}
