import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { WagonTypeService } from './wagon-type.service';
import { WagonTypeModel } from './model/wagon-type.model';
import { CreateWagonTypeInput } from './inputs/create-wagon-type.input';
import { UpdateWagonTypeInput } from './inputs/update-wagon-type.input';

@Resolver(() => WagonTypeModel)
export class WagonTypeResolver {
  constructor(private readonly wagonTypeService: WagonTypeService) {}

  @Query(() => [WagonTypeModel], {
    description: 'Получить список всех типов вагонов',
  })
  getWagonTypes() {
    return this.wagonTypeService.findAll();
  }

  @Query(() => WagonTypeModel, {
    name: 'findOneWagonType',
    description: 'Получить тип вагона по его ID',
  })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.wagonTypeService.findOne(id);
  }

  @Mutation(() => WagonTypeModel, {
    description: 'Создать новый тип вагона',
  })
  createWagonType(@Args('create') input: CreateWagonTypeInput) {
    return this.wagonTypeService.create(input);
  }

  @Mutation(() => WagonTypeModel, {
    description: 'Обновить тип вагона по ID',
  })
  updateWagonType(@Args('update') input: UpdateWagonTypeInput) {
    return this.wagonTypeService.update(input);
  }

  @Mutation(() => Boolean, {
    description: 'Удалить тип вагона по его ID',
  })
  removeWagon(@Args('id', { type: () => ID }) id: string) {
    return this.wagonTypeService.delete(id);
  }
}
