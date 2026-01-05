import { Field, InputType } from '@nestjs/graphql';

@InputType({ description: 'Данные для создания груза' })
export class CreateCargoInput {
  @Field(() => String, {
    description: 'Название груза (уникальное)',
  })
  name!: string;

  @Field(() => String, { description: 'Код груза ГНГ внутренний (уникальный)' })
  nationalCode!: string;

  @Field(() => String, {
    description: 'Код груза ЕГСНГ международный (уникальный)',
  })
  internationalCode!: string;
}
