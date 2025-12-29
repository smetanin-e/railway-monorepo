import { Module } from '@nestjs/common';
import { WagonTypeService } from './wagon-type.service';
import { WagonTypeResolver } from './wagon-type.resolver';

@Module({
  providers: [WagonTypeResolver, WagonTypeService],
})
export class WagonTypeModule {}
