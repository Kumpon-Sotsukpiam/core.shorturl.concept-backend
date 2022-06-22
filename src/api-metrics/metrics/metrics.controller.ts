import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

//------------ Import services ------------//
import { MetricsService } from './commands/metrics.service';
//------------ Import decorators ------------//
import { Public } from '../../common/decorators';

@ApiTags('Metrics')
@Controller('metrics')
export class MetricsController {
  constructor(private metricsService: MetricsService) {}

  @Get()
  @Public()
  public metrics(): Promise<string> {
    return this.metricsService.metrics();
  }
}
