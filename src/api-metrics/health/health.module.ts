import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';

//------------ Import controllers ------------//
import { HealthController } from './health.controller';
//------------ Import services ------------//
import { HealthService } from './commands/health.service';
//------------ Import modules ------------//
import { PrometheusModule } from '../prometheus/prometheus.module';
import { AnyOtherModuleModule } from '../../modules/any-other-module/any-other-module.module';

@Module({
  imports: [TerminusModule, PrometheusModule, AnyOtherModuleModule],
  controllers: [HealthController],
  providers: [HealthService],
  exports: [HealthService],
})
export class HealthModule {}
