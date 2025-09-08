import { Controller, Get } from '@nestjs/common';
import {
  ApiOperation,
  ApiProperty,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

export class HealthType {
  @ApiProperty({ examples: ['up', 'down'] })
  status: string;
}

@ApiTags('health')
@Controller({ path: 'health', version: '1' })
export class HealthController {
  constructor() {}

  @ApiOperation({ summary: 'Application Status' })
  @ApiResponse({
    status: 200,
    description: 'Application Status',
  })
  @Get()
  getStatus(): HealthType {
    return { status: 'up' };
  }
}
