import { Resolver } from '@nestjs/graphql';
import { WagonService } from './wagon.service';

@Resolver()
export class WagonResolver {
  constructor(private readonly wagonService: WagonService) {}
}
