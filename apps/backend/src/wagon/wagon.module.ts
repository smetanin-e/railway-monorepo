import { Module } from '@nestjs/common';
import { WagonService } from './wagon.service';
import { WagonResolver } from './wagon.resolver';

@Module({
  providers: [WagonResolver, WagonService],
})
export class WagonModule {}
