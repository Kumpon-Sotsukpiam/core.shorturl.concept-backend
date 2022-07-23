import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { HttpModule } from '@nestjs/axios';
import { BullModule } from '@nestjs/bull';

//------------ Import guards ------------//
import { AccessTokenGuard } from './modules/auth/guards/jwt-access-token.guard';
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
import { AuthModule } from './modules/auth/auth.module';
import { LinkModule } from './modules/link/link.module';
import { VisitModule } from './modules/visit/visit.module';
import { IPModule } from './modules/ip/ip.module';
import { RedirectModule } from './modules/redirect/redirect.module';

const BusinessModule = [
  AuthModule,
  RedirectModule,
  UserModule,
  LinkModule,
  VisitModule,
  IPModule,
];
const MonitoringModule = [HealthModule, MetricsModule];
const GuardModule = [
  {
    provide: APP_GUARD,
    useClass: AccessTokenGuard,
  },
];
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/env/${process.env.NODE_ENV}.env`,
      isGlobal: true,
      load: [configuration],
      validationSchema,
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        redis: {
          host: configService.get('REDIS_HOST'),
          port: configService.get('REDIS_PORT'),
          db: configService.get('REDIS_DB'),
        },
      }),
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
