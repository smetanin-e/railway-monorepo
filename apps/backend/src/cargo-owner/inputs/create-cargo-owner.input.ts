import { Field, InputType } from '@nestjs/graphql';

@InputType({ description: 'Данные для создания владельца груза' })
export class CreateCargoOwnerInput {
  @Field(() => String, {
    description: 'Название владельца груза (уникальное)',
  })
  name!: string;
}
