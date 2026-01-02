import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { CreateWagonOwnerInput } from './create-wagon-owner.input';

@InputType({ description: 'Данные для обновления владельца вагона' })
export class UpdateWagonOwnerInput extends PartialType(CreateWagonOwnerInput) {
  @Field(() => ID, {
    description: 'ID владельца вагона',
  })
  id!: string;
}
