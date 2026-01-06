import { Module } from '@nestjs/common';
import { BatchService } from './batch.service';
import { BatchResolver } from './batch.resolver';

@Module({
  providers: [BatchResolver, BatchService],
})
export class BatchModule {}
