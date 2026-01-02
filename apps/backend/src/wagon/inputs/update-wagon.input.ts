import { InputType, Field, ID, Float, PartialType } from '@nestjs/graphql';
import { CreateWagonInput } from './create-wagon.input';

@InputType({ description: 'Данные для обновления информации о вагоне' })
export class UpdateWagonInput extends PartialType(CreateWagonInput) {
  @Field(() => ID, {
    description: 'ID вагона',
  })
  id!: string;
}
