import { CreateWagonTypeInput, createWagonTypeSchema } from '@railway/shared';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';

export class CreateWagonTypePipe extends ZodValidationPipe<CreateWagonTypeInput> {
  constructor() {
    super(createWagonTypeSchema);
  }
}
