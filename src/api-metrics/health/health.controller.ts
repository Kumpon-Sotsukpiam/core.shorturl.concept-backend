import { Controller, Get } from '@nestjs/common';
import { HealthCheckResult } from '@nestjs/terminus';
import { ApiTags } from '@nestjs/swagger';

//------------ Import services ------------//
import { HealthService } from './commands/health.service';
//------------ Import decorators ------------//
import { Public } from '../../common/decorators';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(private healthService: HealthService) {}
  @Get()
  @Public()
  public async check(): Promise<HealthCheckResult> {
    return this.healthService.check();
  }
}
