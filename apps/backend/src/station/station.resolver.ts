import { Args, Mutation, Resolver, Query, ID } from '@nestjs/graphql';
import { StationService } from './station.service';
import { StationModel } from './model/station.model';
import { CreateStationInput } from './inputs/create-station.input';
import { UsePipes } from '@nestjs/common';
import { CreateStationPipe } from './pipes/create-station.pipe';

@Resolver(() => StationModel)
export class StationResolver {
  constructor(private readonly stationService: StationService) {}

  @Query(() => [StationModel], {
    description: 'Получить список всех станций',
  })
  getStations() {
    return this.stationService.findAll();
  }

  @Query(() => StationModel, {
    name: 'findOneStation',
    description: 'Получить одну станцию по ID',
  })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.stationService.findOne(id);
  }

  @Mutation(() => StationModel, {
    description: 'Добавить новую станцию',
  })
  @UsePipes(new CreateStationPipe())
  createStation(@Args('create') input: CreateStationInput) {
    return this.stationService.create(input);
  }

  @Mutation(() => Boolean, {
    description: 'Удалить станцию по ID',
  })
  removeStation(@Args('id', { type: () => ID }) id: string) {
    return this.stationService.delete(id);
  }
}
