import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from 'src/common/base.model';

@ObjectType({ description: 'Партия вагонов' })
export class BatchModel extends BaseModel {
  @Field(() => String, { description: 'Номер партии (он же номер накладной)' })
  documentNumber!: String;
}
