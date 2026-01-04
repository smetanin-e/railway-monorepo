import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import { UpdateWagonInput, updateWagonSchema } from '@railway/shared';

export class UpdateWagonPipe extends ZodValidationPipe<UpdateWagonInput> {
  constructor() {
    super(updateWagonSchema);
  }
}
