import { Field, Float, InputType } from '@nestjs/graphql';
import { OperationCategory } from '../enums/operation-category.enum';

@InputType({ description: 'Данные для создания типа операции' })
export class CreateOperationTypeInput {
  @Field(() => String, { description: 'Название операции' })
  name!: string;

  @Field(() => Float, { description: 'Норма' })
  normative!: number;

  @Field(() => OperationCategory, {
    description: 'Категория операции "ACTIVE" | "PASSIVE"',
  })
  category!: OperationCategory;
}
