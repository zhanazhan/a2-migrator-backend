import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

import { ComplexDto } from '@/modules/complex/dtos/complexes-data.dto';
import { ComplexesService } from '@/modules/complex/services/complexes.service';

@Controller({ path: 'complexes', version: '1' })
export class ComplexesController {
  constructor(private readonly service: ComplexesService) {}

  @Get()
  @ApiOperation({ summary: 'Complexes Query Request' })
  @ApiResponse({
    status: 200,
    description: 'Complexes List Response',
    type: ComplexDto,
    isArray: true,
  })
  @ApiResponse({
    status: 404,
    description: 'Non Matched',
  })
  async find(@Query('name') complexName: string, @Query('city') city: string) {
    return this.service.find(complexName, city);
  }
}
