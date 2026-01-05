import { Field, Float, InputType } from '@nestjs/graphql';
import { WagonOwnership } from '../enums/wagon-ownership.enum';

@InputType({ description: 'Данные для создания вагона' })
export class CreateWagonInput {
  @Field(() => String, { description: 'Номер вагона (уникальный)' })
  number!: string;

  @Field(() => WagonOwnership, {
    description: 'Принадлежность вагона ("OWN" | "LEASED")',
  })
  affiliationType!: WagonOwnership;

  @Field(() => String, { description: 'ID типа вагона' })
  typeId!: string;

  @Field(() => String, { description: 'ID владельца вагона' })
  ownerId!: string;

  @Field(() => Float, { description: 'Тара с бруса (т)' })
  barPackage!: number;

  @Field(() => Float, { description: 'Грузоподъемность (т)' })
  capacity!: number;

  @Field(() => Float, { description: 'Объем (м³)' })
  volume!: number;
}
