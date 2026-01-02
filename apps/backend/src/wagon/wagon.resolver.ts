import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { WagonService } from './wagon.service';
import { WagonModel } from './model/wagon.model';
import { CreateWagonInput } from './inputs/create-wagon.input';

@Resolver(() => WagonModel)
export class WagonResolver {
  constructor(private readonly wagonService: WagonService) {}

  @Query(() => [WagonModel], {
    description: 'Получить список всех вагонов',
  })
  getWagons() {
    return this.wagonService.findAll();
  }

  @Query(() => WagonModel, {
    name: 'findOneWagon',
    description: 'Получить один вагон по ID',
  })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.wagonService.findOne(id);
  }

  @Mutation(() => WagonModel, {
    description: 'Добавить новый вагон',
  })
  createWagon(@Args('create') input: CreateWagonInput) {
    return this.wagonService.create(input);
  }
}
