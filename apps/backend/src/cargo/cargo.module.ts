import { Module } from '@nestjs/common';
import { CargoService } from './cargo.service';
import { CargoResolver } from './cargo.resolver';

@Module({
  providers: [CargoResolver, CargoService],
})
export class CargoModule {}
