import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from 'src/common/base.model';

@ObjectType({ description: 'Владелец груза' })
export class CargoOwnerModel extends BaseModel {
  @Field(() => String, { description: 'Название владельца груза' })
  name!: string;
}
