import { Field, Float, ID, ObjectType } from '@nestjs/graphql';
import { WagonOwnerModel } from 'src/wagon-owner/model/wagon-owner-model';
import { WagonTypeModel } from 'src/wagon-type/model/wagon-type.model';

@ObjectType({ description: 'Вагона' })
export class WagonModel {
  @Field(() => ID, { description: 'UUID вагона' })
  id!: string;

  @Field(() => String, { description: 'Номер вагона (строка)' })
  number!: string;

  @Field(() => String, { description: 'ID типа вагона' })
  typeId!: string;

  @Field(() => WagonTypeModel, {
    nullable: true,
    description: 'Связь с типом вагона',
  })
  type?: WagonTypeModel | null;

  @Field(() => String, { description: 'ID владельца вагона' })
  ownerId!: string;

  @Field(() => WagonOwnerModel, {
    nullable: true,
    description: 'Связь с владельцем вагона',
  })
  owner?: WagonOwnerModel | null;

  @Field(() => Float, { description: 'Тара с бруса (т)' })
  barPackage!: number;

  @Field(() => Float, { description: 'Грузоподъемность (т)' })
  capacity!: number;

  @Field(() => Float, { description: 'Объем (м³)' })
  volume!: number;

  @Field(() => Date)
  createdAt!: Date;

  @Field(() => Date)
  updatedAt!: Date;
}
