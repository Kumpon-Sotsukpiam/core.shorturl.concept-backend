import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

//------------ Import configs ------------//
import { configuration } from './config/configuration';
import { validationSchema } from './config/validation';
//------------ Import middlewares ------------//
import LogsMiddleware from './common/middleware/logs.middleware';
// ------------Import modules------------//
import { HealthModule } from './api-metrics/health/health.module';
import { MetricsModule } from './api-metrics/metrics/metrics.module';
import { PrismaModule } from './modules/prisma';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/user.module';
import { DomainModule } from './modules/domain/domain.module';
import { LinkModule } from './modules/link/link.module';
import { UrlModule } from './modules/url/url.module';

const BusinessModule = [
  UserModule,
  AuthModule,
  DomainModule,
  LinkModule,
  UrlModule,
];
const MonitoringModule = [HealthModule, MetricsModule];
const GuardModule = [];
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/env/${process.env.NODE_ENV}.env`,
      isGlobal: true,
      load: [configuration],
      validationSchema,
    }),
    HttpModule,
    PrismaModule,
    ...MonitoringModule,
    ...BusinessModule,
  ],
  controllers: [],
  providers: [...GuardModule],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogsMiddleware).forRoutes('*');
  }
}
