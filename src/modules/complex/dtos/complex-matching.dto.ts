import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { ComplexDto } from '@/modules/complex/dtos/complexes-data.dto';

export class ComplexMatchingDto {
  @ApiProperty({
    description: 'Normalized complex name',
  })
  @Expose()
  name: string;

  @ApiProperty({
    description: 'Exact Match',
  })
  @Expose()
  exactMatch: boolean;

  @ApiProperty({
    type: ComplexDto,
    isArray: true,
    description: 'Complex that best fit the search',
  })
  @Expose()
  sources: ComplexDto[];
}
