import { Field, InputType } from '@nestjs/graphql';

@InputType({ description: 'Данные для создания типа вагона' })
export class CreateWagonTypeInput {
  @Field(() => String, { description: 'Название типа вагона (уникальное)' })
  name!: string;

  @Field(() => String, {
    description:
      'Префикс для нумерации вагона(Только цифры. Например "3" или "34")',
  })
  numberPrefix!: string;
}
