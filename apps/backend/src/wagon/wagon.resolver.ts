import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { WagonService } from './wagon.service';
import { WagonModel } from './model/wagon.model';
import { CreateWagonInput } from './inputs/create-wagon.input';
import { UpdateWagonInput } from './inputs/update-wagon.input';

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

  @Mutation(() => WagonModel, {
    description: 'Обновить информацию о вагоне',
  })
  updateWagon(@Args('update') input: UpdateWagonInput) {
    return this.wagonService.update(input);
  }

  @Mutation(() => Boolean, {
    description: 'Удалить вагон',
  })
  removeWagonType(@Args('id', { type: () => ID }) id: string) {
    return this.wagonService.delete(id);
  }
}
