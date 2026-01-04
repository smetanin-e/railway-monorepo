import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import { CreateWagonInput, createWagonSchema } from '@railway/shared';

export class CreateWagonPipe extends ZodValidationPipe<CreateWagonInput> {
  constructor() {
    super(createWagonSchema);
  }
}
