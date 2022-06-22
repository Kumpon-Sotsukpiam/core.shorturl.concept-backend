import { Module } from '@nestjs/common';

//------------ Import services ------------//
import { PrometheusService } from './commands/prometheus.service';

@Module({
  providers: [PrometheusService],
  exports: [PrometheusService],
})
export class PrometheusModule {}
