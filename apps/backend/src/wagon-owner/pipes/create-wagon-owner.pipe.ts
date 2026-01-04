import { CreateWagonOwnerInput, createWagonOwnerSchema } from '@railway/shared';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';

export class CreateWagonOwnerPipe extends ZodValidationPipe<CreateWagonOwnerInput> {
  constructor() {
    super(createWagonOwnerSchema);
  }
}
