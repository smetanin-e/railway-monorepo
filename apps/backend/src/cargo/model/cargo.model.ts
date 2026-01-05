import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from 'src/common/base.model';

@ObjectType({ description: 'Груз' })
export class CargoModel extends BaseModel {
  @Field(() => String, { description: 'Название груза' })
  name!: string;

  @Field(() => String, { description: 'Код груза ГНГ(внутренний)' })
  nationalCode!: string;

  @Field(() => String, { description: 'Код груза ЕГСНГ (международный)' })
  internationalCode!: string;
}
