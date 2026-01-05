import { Module } from '@nestjs/common';
import { CargoOwnerService } from './cargo-owner.service';
import { CargoOwnerResolver } from './cargo-owner.resolver';

@Module({
  providers: [CargoOwnerResolver, CargoOwnerService],
})
export class CargoOwnerModule {}
