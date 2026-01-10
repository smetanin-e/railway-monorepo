import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';
import { BaseModel } from 'src/common/base.model';
import { OperationTypeModel } from 'src/operation-type/model/operation-type.model';
import { WagonStateModel } from 'src/wagon-state/model/wagon-state.model';
@ObjectType({ description: 'Операция с вагоном' })
export class WagonOperationModel extends BaseModel {
  @Field(() => GraphQLISODateTime, {
    description: 'Дата и время начала операции',
  })
  startedAt!: Date;

  @Field(() => GraphQLISODateTime, {
    nullable: true,
    description: 'Дата и время завершение операции',
  })
  endedAt?: Date;

  @Field(() => OperationTypeModel, {
    description: 'Тип операции',
  })
  type!: OperationTypeModel;

  //   @Field(() => WagonStateModel, {
  //     description: 'Связь с состоянием вагона',
  //   })
  //   wagonState!: WagonStateModel;
}
