import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { StationService } from './station.service';
import { StationModel } from './model/station.model';
import { CreateStationInput } from './inputs/create-station.input';

@Resolver()
export class StationResolver {
  constructor(private readonly stationService: StationService) {}

  @Mutation(() => StationModel, {
    description: 'Добавить новую станцию',
  })
  createStation(@Args('create') input: CreateStationInput) {
    return this.stationService.create(input);
  }
}
