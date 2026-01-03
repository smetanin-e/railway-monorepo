import { Field, InputType } from '@nestjs/graphql';
import { StationType } from '../enums/station-type.enum';

@InputType({ description: 'Данные для создания станции' })
export class CreateStationInput {
  @Field(() => String, { description: 'Название станции (уникальное)' })
  name!: string;

  @Field(() => StationType, {
    description: 'Тип станции ("INTERNAL" | "EXTERNAL")',
  })
  type!: StationType;

  @Field(() => String, {
    nullable: true,
    description: 'Код снанции (только для "EXTERNAL")',
  })
  code!: string | null;
}
