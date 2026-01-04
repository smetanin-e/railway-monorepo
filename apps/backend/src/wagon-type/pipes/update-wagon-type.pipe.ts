import { UpdateWagonTypeInput, updateWagonTypeSchema } from '@railway/shared';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';

export class UpdateWagonTypePipe extends ZodValidationPipe<UpdateWagonTypeInput> {
  constructor() {
    super(updateWagonTypeSchema);
  }
}
