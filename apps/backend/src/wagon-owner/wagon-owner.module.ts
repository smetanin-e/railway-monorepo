import { Module } from '@nestjs/common';
import { WagonOwnerService } from './wagon-owner.service';
import { WagonOwnerResolver } from './wagon-owner.resolver';

@Module({
  providers: [WagonOwnerResolver, WagonOwnerService],
})
export class WagonOwnerModule {}
