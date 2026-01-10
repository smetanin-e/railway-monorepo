import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';
import { CargoModel } from 'src/cargo/model/cargo.model';
import { BaseModel } from 'src/common/base.model';
import { StationModel } from 'src/station/model/station.model';
import { TripModel } from 'src/trip/model/trip.model';
import { WagonOperationModel } from 'src/wagon-operation/model/wagon-operation.model';
import { WagonModel } from 'src/wagon/model/wagon.model';

@ObjectType({ description: 'Операция с вагоном' })
export class WagonStateModel extends BaseModel {
  @Field(() => WagonModel, {
    description: 'Связь с вагоном',
  })
  wagon!: WagonModel;

  @Field(() => TripModel, {
    description: 'Связь с рейсом',
  })
  trip!: TripModel;

  @Field(() => CargoModel, { description: 'Связь с грузом' })
  cargo!: CargoModel;

  @Field(() => Boolean, { description: 'Пустой вагон или нет' })
  isEmpty!: boolean;

  @Field(() => StationModel, { description: 'Связь со станцией' })
  station!: StationModel;

  @Field(() => GraphQLISODateTime, {
    description: 'Дата и время начала операции',
  })
  startedAt!: Date;

  @Field(() => GraphQLISODateTime, {
    description: 'Дата и время окончания операции',
    nullable: true,
  })
  endedAt?: Date;

  @Field(() => [WagonOperationModel], {
    description: 'Связь с операциями',
  })
  wagonOperations!: WagonOperationModel[];
}
