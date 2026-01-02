import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { CreateWagonTypeInput } from './create-wagon-type.input';

@InputType()
export class UpdateWagonTypeInput extends PartialType(CreateWagonTypeInput) {
  @Field(() => ID, {
    description: 'ID типа вагона',
  })
  id!: string;
}
