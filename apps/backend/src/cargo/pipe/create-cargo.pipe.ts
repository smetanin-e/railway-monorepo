import { CreateCargoInput, createCargoSchema } from '@railway/shared';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';

export class CreateCargoPipe extends ZodValidationPipe<CreateCargoInput> {
  constructor() {
    super(createCargoSchema);
  }
}
