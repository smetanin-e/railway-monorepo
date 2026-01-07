import { Args, Resolver, Mutation } from '@nestjs/graphql';
import { BatchService } from './batch.service';
import { BatchModel } from './model/batch.model';
import { CreateBatchInput } from './inputs/create-batch.input';

@Resolver()
export class BatchResolver {
  constructor(private readonly batchService: BatchService) {}

  @Mutation(() => BatchModel, {
    description: 'Добавить партию',
  })
  createBatch(@Args('data') input: CreateBatchInput) {
    return this.batchService.create(input);
  }
}
