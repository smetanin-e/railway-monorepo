import { Resolver } from '@nestjs/graphql';
import { BatchService } from './batch.service';

@Resolver()
export class BatchResolver {
  constructor(private readonly batchService: BatchService) {}
}
