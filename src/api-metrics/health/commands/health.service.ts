import { Injectable, Logger } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckResult,
  HealthCheckService,
  // HttpHealthIndicator,
} from '@nestjs/terminus';

//------------ Import services ------------//
import { PrometheusService } from '../../prometheus/commands/prometheus.service';
import { AnyOtherModuleService } from '../../../modules/any-other-module/commands/any-other-module.service';
//------------ Import interfaces ------------//
import { HealthIndicator } from '../interfaces/health-indicator.interface';
//------------ Import indicators ------------//
// import { NestjsHealthIndicator } from '../models/nestjs-health.indicator';
import { AnyOtherHealthIndicator } from '../models/any-other-health.indicator';

@Injectable()
export class HealthService {
  private readonly listOfThingsToMonitor: HealthIndicator[];
  constructor(
    private health: HealthCheckService,
    // private http: HttpHealthIndicator,
    private promClientService: PrometheusService,
    private anyOtherService: AnyOtherModuleService,
  ) {
    this.listOfThingsToMonitor = [
      // new NestjsHealthIndicator(this.http, '8.8.8.8', this.promClientService),
      new AnyOtherHealthIndicator(this.anyOtherService, this.promClientService),
    ];
  }
  @HealthCheck()
  public async check(): Promise<HealthCheckResult | undefined> {
    return this.health.check(
      this.listOfThingsToMonitor.map(
        (apiIndicator: HealthIndicator) => async () => {
          try {
            return await apiIndicator.isHealthy();
          } catch (e) {
            Logger.warn(e);
            return apiIndicator.reportUnhealthy();
          }
        },
      ),
    );
  }
}
