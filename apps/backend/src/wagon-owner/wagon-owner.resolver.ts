import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { WagonOwnerService } from './wagon-owner.service';
import { WagonOwnerModel } from './model/wagon-owner-model';
import { CreateWagonOwnerInput } from './inputs/create-wagon-owner.input';

@Resolver(() => WagonOwnerModel)
export class WagonOwnerResolver {
  constructor(private readonly wagonOwnerService: WagonOwnerService) {}

  @Query(() => [WagonOwnerModel], {
    description: 'Получить список всех собственников вагонов',
  })
  getWagonOwners() {
    return this.wagonOwnerService.findAll();
  }

  @Query(() => WagonOwnerModel, {
    name: 'findOneWagonOwner',
    description: 'Получить собственника вагона по ID',
  })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.wagonOwnerService.findOne(id);
  }

  @Mutation(() => WagonOwnerModel, {
    description: 'Создать новый тип вагона',
  })
  createWagonOwner(@Args('create') input: CreateWagonOwnerInput) {
    return this.wagonOwnerService.create(input);
  }

  //! Нет необходимости обновлять владельца вагона
  //   @Mutation(() => WagonOwnerModel, {
  //     description: 'Обновить собственника вагона по его ID',
  //   })
  //   updateWagonOwner(@Args('update') input: UpdateWagonOwnerInput) {
  //     return this.wagonOwnerService.update(input);
  //   }

  @Mutation(() => Boolean, {
    description: 'Удалить тип вагона по его ID',
  })
  removeOwner(@Args('id', { type: () => ID }) id: string) {
    return this.wagonOwnerService.delete(id);
  }
}
