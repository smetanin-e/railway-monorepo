import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CargoOwnerService } from './cargo-owner.service';
import { CargoOwnerModel } from './model/cargo-owner.model';
import { CreateCargoOwnerPipe } from './pipes/create-cargo-owner.pipe';
import { CreateCargoOwnerInput } from './inputs/create-cargo-owner.input';

@Resolver()
export class CargoOwnerResolver {
  constructor(private readonly cargoOwnerService: CargoOwnerService) {}

  @Query(() => [CargoOwnerModel], {
    description: 'Получить список всех собственников груза',
  })
  getCargoOwners() {
    return this.cargoOwnerService.findAll();
  }

  @Query(() => CargoOwnerModel, {
    name: 'findOneCargoOwner',
    description: 'Получить собственника груза по ID',
  })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.cargoOwnerService.findOne(id);
  }

  @Mutation(() => CargoOwnerModel, {
    description: 'Создать новый тип вагона',
  })
  createCargoOwner(
    @Args('data', new CreateCargoOwnerPipe()) input: CreateCargoOwnerInput,
  ) {
    return this.cargoOwnerService.create(input);
  }

  @Mutation(() => Boolean, {
    description: 'Удалить собственника груза по ID',
  })
  removeCargoOwner(@Args('id', { type: () => ID }) id: string) {
    return this.cargoOwnerService.delete(id);
  }
}
