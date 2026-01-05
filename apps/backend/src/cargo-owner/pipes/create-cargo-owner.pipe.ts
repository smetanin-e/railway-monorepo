import { CreateCargoOwnerInput, createCargoOwnerSchema } from '@railway/shared';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';

export class CreateCargoOwnerPipe extends ZodValidationPipe<CreateCargoOwnerInput> {
  constructor() {
    super(createCargoOwnerSchema);
  }
}
