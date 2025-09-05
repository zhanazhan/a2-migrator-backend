import { ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { FlatLocation } from '@/database/entities';

export class ComplexDto {
  @ApiPropertyOptional() @Exclude() id?: string;
  @ApiPropertyOptional() @Expose() name?: string;
  @ApiPropertyOptional() @Expose() class?: string;
  @ApiPropertyOptional() @Expose() company?: string;
  @ApiPropertyOptional() @Expose() address?: string;
  @ApiPropertyOptional() @Expose() region?: string;
  @ApiPropertyOptional() @Expose() regionAlias?: string;
  @ApiPropertyOptional() @Expose() priceSquareFrom?: number;
  @ApiPropertyOptional() @Expose() priceSquareTo?: number;
  @ApiPropertyOptional() @Expose() priceFrom?: number;
  @ApiPropertyOptional() @Expose() year?: number;
  @ApiPropertyOptional() @Expose() totalFloors?: number;

  @ApiPropertyOptional()
  @Type(() => FlatLocation)
  @Expose()
  map?: FlatLocation;
}
