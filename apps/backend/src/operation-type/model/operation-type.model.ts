import { Field, Float, ObjectType } from '@nestjs/graphql';
import { BaseModel } from 'src/common/base.model';
import { OperationCategory } from '../enums/operation-category.enum';
import { OperationConcurrency } from '../enums/operation-concurrency.enum';

@ObjectType({ description: 'Тип операции' })
export class OperationTypeModel extends BaseModel {
  @Field(() => String, { description: 'Название операции' })
  name!: string;

  @Field(() => Float, { description: 'Норма' })
  normative!: number;

  @Field(() => OperationCategory, {
    description: 'Категория операции "ACTIVE" | "PASSIVE"',
  })
  category!: OperationCategory;

  @Field(() => OperationConcurrency, {
    description: 'Конкурентность выполнения операций "EXCLUSIVE" | "PARALLEL"',
  })
  concurrency!: OperationConcurrency;

  // Связь с операциями
  //wagonOperations
}
