import { Module } from '@nestjs/common';
import { WagonOperationService } from './wagon-operation.service';
import { WagonOperationResolver } from './wagon-operation.resolver';

@Module({
  providers: [WagonOperationResolver, WagonOperationService],
})
export class WagonOperationModule {}
