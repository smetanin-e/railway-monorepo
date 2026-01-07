import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { OperationTypeService } from './operation-type.service';
import { OperationTypeModel } from './model/operation-type.model';
import { CreateOperationTypeInput } from './inputs/create-operation-type.input';
import { CreateOperationTypePipe } from './pipes/create-operation-type.pipe';

@Resolver()
export class OperationTypeResolver {
  constructor(private readonly operationTypeService: OperationTypeService) {}

  @Query(() => [OperationTypeModel], {
    description: 'Получить список всех типов операций',
  })
  getWagonTypes() {
    return this.operationTypeService.findAll();
  }

  @Query(() => OperationTypeModel, {
    name: 'findOneOperationType',
    description: 'Получить тип операции по ID',
  })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.operationTypeService.findOne(id);
  }

  @Mutation(() => OperationTypeModel, {
    description: 'Создать новый тип операции',
  })
  createOperationType(
    @Args('data', new CreateOperationTypePipe())
    input: CreateOperationTypeInput,
  ) {
    return this.operationTypeService.create(input);
  }

  @Mutation(() => Boolean, {
    description: 'Удалить тип операции по ID',
  })
  removeperationType(@Args('id', { type: () => ID }) id: string) {
    return this.operationTypeService.delete(id);
  }
}
