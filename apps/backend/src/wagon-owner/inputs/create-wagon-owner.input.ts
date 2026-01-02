import { Field, InputType } from '@nestjs/graphql';

@InputType({ description: 'Данные для создания владельца вагона' })
export class CreateWagonOwnerInput {
  @Field(() => String, {
    description: 'Название владельца вагона (уникальное)',
  })
  name!: string;
}
