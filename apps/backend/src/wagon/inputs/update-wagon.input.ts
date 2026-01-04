import { InputType, Field, ID, Float, PartialType } from '@nestjs/graphql';

@InputType({ description: 'Данные для обновления информации о вагоне' })
export class UpdateWagonInput {
  @Field(() => Float, { nullable: true, description: 'Тара с бруса (т)' })
  barPackage?: number;

  @Field(() => Float, { nullable: true, description: 'Грузоподъемность (т)' })
  capacity?: number;

  @Field(() => Float, { nullable: true, description: 'Объем (м³)' })
  volume?: number;
}
