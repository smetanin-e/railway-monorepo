import { Resolver } from '@nestjs/graphql';
import { TripService } from './trip.service';

@Resolver()
export class TripResolver {
  constructor(private readonly tripService: TripService) {}
}
