import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';
import { BaseModel } from 'src/common/base.model';
import { BatchDirection } from '../enums/batch-direction.enum';
import { BatchType } from '../enums/batch-type.enum';
import { CargoOwnerModel } from 'src/cargo-owner/model/cargo-owner.model';
import { StationModel } from 'src/station/model/station.model';
import { TripModel } from 'src/trip/model/trip.model';
import { CargoModel } from 'src/cargo/model/cargo.model';

@ObjectType({ description: 'Партия вагонов' })
export class BatchModel extends BaseModel {
  @Field(() => String, { description: 'Номер партии (он же номер накладной)' })
  documentNumber!: string;

  @Field(() => BatchDirection, {
    description:
      'Принадлежность партии (входящая / исходящая)  ("INBOUND" | "OUTBOUND") ',
  })
  direction!: BatchDirection;

  @Field(() => BatchType, {
    description:
      'Тип партии партии (по накладной / по вагонному листу)  ("WAYBILL" | "ROUTE_SHEET") ',
  })
  type!: BatchType;

  @Field(() => GraphQLISODateTime, {
    description: 'Время и дата прибытия партии',
  })
  startedAt!: Date;

  @Field(() => CargoModel, {
    nullable: true,
    description: 'Связь с грузом',
  })
  cargo?: CargoModel | null;

  @Field(() => CargoOwnerModel, {
    nullable: true,
    description: 'Связь с владельцем груза',
  })
  cargoOwner?: CargoOwnerModel | null;

  @Field(() => StationModel, {
    description: 'Связь со станцией выхода',
  })
  fromStation!: StationModel;

  @Field(() => StationModel, {
    description: 'Связь со станцией входа',
  })
  toStation!: StationModel;

  @Field(() => [TripModel], {
    description: 'Связь с рейсами',
  })
  trips!: TripModel[];
}
