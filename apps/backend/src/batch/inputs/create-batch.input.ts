import { Field, GraphQLISODateTime, InputType } from '@nestjs/graphql';
import { BatchDirection } from '../enums/batch-direction.enum';
import { BatchType } from '../enums/batch-type.enum';

@InputType({ description: 'Данные для создания партии' })
export class CreateBatchInput {
  @Field(() => String, {
    description: 'Номер партии (накладная или вагонный лист) (уникальное)',
  })
  documentNumber!: string;

  @Field(() => BatchDirection, {
    description: 'Принадлежность партии ("INBOUND" | "OUTBOUND")',
  })
  direction!: BatchDirection;

  @Field(() => BatchType, {
    description: 'Тип партии партии ("WAYBILL" | "ROUTE_SHEET")',
  })
  type!: BatchType;

  @Field(() => GraphQLISODateTime, {
    description: 'Время и дата прибытия партии',
  })
  startedAt!: Date;

  @Field(() => String, {
    description: 'ID груза',
  })
  cargoId!: string;

  @Field(() => String, {
    description: 'ID владельца груза',
  })
  cargoOwnerId!: string;

  @Field(() => String, {
    description: 'ID станции выхода партии',
  })
  fromStationId!: string;

  @Field(() => String, {
    description: 'ID станции входа партии',
  })
  toStationId!: string;

  @Field(() => [String], {
    description: 'ID вагонов внутри партии',
  })
  wagonIds!: string[];
}
