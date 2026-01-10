import { Field, GraphQLISODateTime, InputType } from '@nestjs/graphql';

@InputType({ description: 'Данные для создания операции' })
export class CreateWagonOperationInput {
  @Field(() => String, {
    description: 'ID рейса',
  })
  tripId!: string;
  @Field(() => String, {
    description: 'ID типа операции',
  })
  typeId!: string;

  @Field(() => String, { nullable: true, description: 'ID груза' })
  cargoId!: string;

  @Field(() => String, { description: 'ID станции' })
  stationId!: string;

  @Field(() => GraphQLISODateTime, {
    description: 'Дата и время начала операции',
  })
  startedAt!: Date;

  @Field(() => GraphQLISODateTime, {
    nullable: true,
    description: 'Дата и время окончания операции',
  })
  endedAt?: Date;
}
