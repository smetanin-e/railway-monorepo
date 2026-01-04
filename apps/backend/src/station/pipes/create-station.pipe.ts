import { CreateStationInput, createStationSchema } from '@railway/shared';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';

export class CreateStationPipe extends ZodValidationPipe<CreateStationInput> {
  constructor() {
    super(createStationSchema);
  }
}
