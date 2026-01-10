import {
  CreateWagonOperationInput,
  createWagonOperationSchema,
} from '@railway/shared';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';

export class CreateWagonOperationPipe extends ZodValidationPipe<CreateWagonOperationInput> {
  constructor() {
    super(createWagonOperationSchema);
  }
}
