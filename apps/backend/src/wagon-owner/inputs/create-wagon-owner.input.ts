import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateWagonOwnerInput {
  @Field(() => String)
  name!: string;
}
