import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CargoService } from './cargo.service';
import { CargoModel } from './model/cargo.model';
import { CreateCargoPipe } from './pipe/create-cargo.pipe';
import { CreateCargoInput } from './inputs/create-cargo.input';

@Resolver()
export class CargoResolver {
  constructor(private readonly cargoService: CargoService) {}

  @Query(() => [CargoModel], {
    description: 'Получить список всех грузов',
  })
  getCargos() {
    return this.cargoService.findAll();
  }

  @Query(() => CargoModel, {
    name: 'findOneCargo',
    description: 'Получить груз по ID',
  })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.cargoService.findOne(id);
  }

  @Mutation(() => CargoModel, {
    description: 'Создать новый тип вагона',
  })
  createCargo(@Args('data', new CreateCargoPipe()) input: CreateCargoInput) {
    return this.cargoService.create(input);
  }

  @Mutation(() => Boolean, {
    description: 'Удалить груз по ID',
  })
  removeCargo(@Args('id', { type: () => ID }) id: string) {
    return this.cargoService.delete(id);
  }
}
