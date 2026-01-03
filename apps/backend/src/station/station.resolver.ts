import { Resolver } from '@nestjs/graphql';
import { StationService } from './station.service';

@Resolver()
export class StationResolver {
  constructor(private readonly stationService: StationService) {}
}
