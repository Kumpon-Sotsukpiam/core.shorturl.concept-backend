import { Injectable } from '@nestjs/common';

//------------ Import services ------------//
import { HealthService } from '../../health/commands/health.service';
import { PrometheusService } from '../../prometheus/commands/prometheus.service';

@Injectable()
export class MetricsService {
  constructor(
    private promClientService: PrometheusService,
    private healthService: HealthService,
  ) {}

  public async metrics(): Promise<string> {
    await this.healthService.check();
    return this.promClientService.metrics;
  }
}
