import { HealthIndicatorResult } from '@nestjs/terminus';

//------------ Import indicators ------------//
import { BaseHealthIndicator } from './base-health.indicator';
//------------ Import interfaces ------------//
import { HealthIndicator } from '../interfaces/health-indicator.interface';
//------------ Import services ------------//
import { PrometheusService } from '../../prometheus/commands/prometheus.service';
import { AnyOtherModuleService } from '../../../modules/any-other-module/commands/any-other-module.service';

export class AnyOtherHealthIndicator
  extends BaseHealthIndicator
  implements HealthIndicator
{
  public readonly name = 'AnyOtherCustomHealthIndicator';
  protected readonly help = 'Status of ' + this.name;

  constructor(
    private service: AnyOtherModuleService,
    protected promClientService: PrometheusService,
  ) {
    super();
    // this.registerMetrics();
    this.registerGauges();
  }

  public async isHealthy(): Promise<HealthIndicatorResult> {
    const isHealthy = this.service.isConnected;
    this.updatePrometheusData(isHealthy);
    return this.getStatus(this.name, isHealthy);
  }
}
