import {
  CreateOperationTypeInput,
  createOperationTypeSchema,
} from '@railway/shared';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';

export class CreateOperationTypePipe extends ZodValidationPipe<CreateOperationTypeInput> {
  constructor() {
    super(createOperationTypeSchema);
  }
}
