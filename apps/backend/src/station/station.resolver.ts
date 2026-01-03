import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { StationService } from './station.service';
import { StationModel } from './model/station.model';
import { CreateStationInput } from './inputs/create-station.input';
import { UsePipes } from '@nestjs/common';
import { ValidateStationPipe } from './pipes/validate-station.pipe';

@Resolver(() => StationModel)
@UsePipes(new ValidateStationPipe())
export class StationResolver {
  constructor(private readonly stationService: StationService) {}

  @Query(() => [StationModel], {
    description: 'Получить список всех станций',
  })
  getStations() {
    return this.stationService.findAll();
  }

  @Mutation(() => StationModel, {
    description: 'Добавить новую станцию',
  })
  createStation(@Args('create') input: CreateStationInput) {
    return this.stationService.create(input);
  }
}
