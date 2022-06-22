import { Module } from '@nestjs/common';

//------------ Import services ------------//
import { MetricsService } from './commands/metrics.service';
//------------ Import controllers ------------//
import { MetricsController } from './metrics.controller';
//------------ Import modules ------------//
import { HealthModule } from '../health/health.module';
import { PrometheusModule } from '../prometheus/prometheus.module';

@Module({
  imports: [HealthModule, PrometheusModule],
  providers: [MetricsService],
  controllers: [MetricsController],
})
export class MetricsModule {}
