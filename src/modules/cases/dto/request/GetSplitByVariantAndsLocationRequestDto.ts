import { PickType } from '@nestjs/swagger';
import { Cases } from '../../cases.entity';

export class GetSplitByVariantAndsLocationRequestDto extends PickType(Cases, [
  'date'
]) {}
