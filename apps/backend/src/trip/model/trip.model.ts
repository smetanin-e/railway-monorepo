import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';
import { BatchModel } from 'src/batch/model/batch.model';
import { BaseModel } from 'src/common/base.model';
import { WagonModel } from 'src/wagon/model/wagon.model';

@ObjectType({ description: 'Рейс вагона' })
export class TripModel extends BaseModel {
  @Field(() => GraphQLISODateTime)
  startedAt!: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  finishedAt?: Date;

  @Field(() => WagonModel, { description: 'Связь с вагоном' })
  wagon!: WagonModel;

  @Field(() => BatchModel)
  batch!: BatchModel;
}
