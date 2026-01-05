import { Field, Float, ID, ObjectType } from '@nestjs/graphql';
import { BaseModel } from 'src/common/base.model';
import { WagonOwnerModel } from 'src/wagon-owner/model/wagon-owner-model';
import { WagonTypeModel } from 'src/wagon-type/model/wagon-type.model';
import { WagonOwnership } from '../enums/wagon-ownership.enum';

@ObjectType({ description: 'Модель вагона' })
export class WagonModel extends BaseModel {
  @Field(() => String, { description: 'Номер вагона (строка)' })
  number!: string;

  @Field(() => WagonOwnership, {
    description: 'Принадлежность вагона ("OWN" | "LEASED")',
  })
  affiliationType!: WagonOwnership;

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
}
