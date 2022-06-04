import { ApiProperty } from '@nestjs/swagger';
import { Cases } from '../../cases.entity';

export class LocationData {
  @ApiProperty({ description: 'Location where the variant occurred ' })
  location: string;

  @ApiProperty({
    description: 'Cases Data',
    isArray: true,
    type: Cases
  })
  variantCasesData: Cases[];
}

export class GetSplitByVariantAndsLocationReponseDto {
  @ApiProperty({ description: 'Variant Type' })
  variant: string;

  @ApiProperty({
    description: 'Location Data',
    type: LocationData,
    isArray: true
  })
  variantCasesData: LocationData[];
}
