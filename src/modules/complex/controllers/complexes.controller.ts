import { Controller, Get, Logger, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

import { ComplexDto } from '@/modules/complex/dtos/complexes-data.dto';
import { ComplexesService } from '@/modules/complex/services/complexes.service';

@Controller({ path: 'complexes', version: '1' })
export class ComplexesController {
  private readonly logger = new Logger(ComplexesController.name);
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
  async find(@Query('name') name: string, @Query('city') city: string) {
    this.logger.debug(`requested: ${name}, city: ${city}`);
    return this.service.find(name, city);
  }

  @Get('cache')
  async getCache() {
    this.logger.debug(`requested cache`);
    return this.service.getCache();
  }
}
