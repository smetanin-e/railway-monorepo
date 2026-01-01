import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { WagonTypeService } from './wagon-type.service';
import { WagonTypeModel } from './model/wagon-type.model';
import { CreateWagonTypeInput } from './inputs/create-wagon-type.input';
import { NotFoundException } from '@nestjs/common';
import { UpdateWagonTypeInput } from './inputs/update-wagon-type.input';

@Resolver(() => WagonTypeModel)
export class WagonTypeResolver {
  constructor(private readonly wagonTypeService: WagonTypeService) {}

  @Query(() => [WagonTypeModel], { name: 'wagon_types' })
  getWagonTypes() {
    return this.wagonTypeService.findAll();
  }

  @Mutation(() => WagonTypeModel)
  createWagonType(
    @Args('createWagonTypeInput') createWagonTypeInput: CreateWagonTypeInput,
  ) {
    return this.wagonTypeService.create(createWagonTypeInput);
  }

  @Mutation(() => WagonTypeModel)
  updateWagonType(
    @Args('updateWagonTypeInput') updateWagonTypeInput: UpdateWagonTypeInput,
  ) {
    return this.wagonTypeService.update(updateWagonTypeInput);
  }

  @Query(() => WagonTypeModel, { name: 'wagon_type' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.wagonTypeService.findOne(id);
  }

  @Mutation(() => Boolean)
  removeWagon(@Args('id', { type: () => ID }) id: string) {
    return this.wagonTypeService.delete(id);
  }
}
