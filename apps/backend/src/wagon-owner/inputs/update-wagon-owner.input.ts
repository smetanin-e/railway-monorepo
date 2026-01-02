import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { CreateWagonOwnerInput } from './create-wagon-owner.input';

@InputType()
export class UpdateWagonOwnerInput extends PartialType(CreateWagonOwnerInput) {
  @Field(() => ID)
  id!: string;
}
