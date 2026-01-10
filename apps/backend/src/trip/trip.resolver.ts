import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { TripService } from './trip.service';
import { TripModel } from './model/trip.model';

@Resolver()
export class TripResolver {
  constructor(private readonly tripService: TripService) {}

  @Query(() => TripModel, {
    name: 'findOneTrip',
    description: 'Получить рейс по ID',
  })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.tripService.findOne(id);
  }
}
