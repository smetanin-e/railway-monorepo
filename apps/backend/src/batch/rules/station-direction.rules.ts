import { StationType } from 'src/station/enums/station-type.enum';
import { BatchDirection } from '../enums/batch-direction.enum';

export const stationRules: Record<
  BatchDirection,
  {
    from: StationType;
    to: StationType;
  }
> = {
  [BatchDirection.INBOUND]: {
    from: StationType.EXTERNAL,
    to: StationType.INTERNAL,
  },
  [BatchDirection.OUTBOUND]: {
    from: StationType.INTERNAL,
    to: StationType.EXTERNAL,
  },
};
