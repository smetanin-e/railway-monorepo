import { Module } from '@nestjs/common';
import { OperationTypeService } from './operation-type.service';
import { OperationTypeResolver } from './operation-type.resolver';

@Module({
  providers: [OperationTypeResolver, OperationTypeService],
})
export class OperationTypeModule {}
