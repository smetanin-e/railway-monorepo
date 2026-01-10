import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { WagonOperationService } from './wagon-operation.service';
import { WagonOperationModel } from './model/wagon-operation.model';
import { CreateWagonOperationInput } from './inputs/create-wagon-operation.input';
import { CreateWagonOperationPipe } from './pipes/create-wagon-operation.pipe';

@Resolver()
export class WagonOperationResolver {
  constructor(private readonly wagonOperationService: WagonOperationService) {}

  @Mutation(() => WagonOperationModel, {
    description: 'Создать новый тип вагона',
  })
  createWagonOperation(
    @Args('data', new CreateWagonOperationPipe())
    input: CreateWagonOperationInput,
  ) {
    return this.wagonOperationService.create(input);
  }
}
