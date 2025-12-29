import { Query, Resolver } from '@nestjs/graphql';
import { WagonTypeService } from './wagon-type.service';
import { WagonTypeModel } from './model/wagon-type.model';

@Resolver()
export class WagonTypeResolver {
  constructor(private readonly wagonTypeService: WagonTypeService) {}

  @Query(() => [WagonTypeModel])
  getWagonTypes() {
    return this.wagonTypeService.findAll();
  }
}
