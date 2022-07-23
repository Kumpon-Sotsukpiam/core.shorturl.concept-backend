import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ExpressAdapter } from '@bull-board/express';
import { createBullBoard } from '@bull-board/api';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import * as Queue from 'bull';
//------------ Import commons ------------//
import { VISIT_QUEUE } from './common/constant/queue.constant';
import { ValidationPipe } from './common/pipes/validation.pipe';
import { GqlExceptionFilter } from './common/filters/graphql-exceptoin.filter';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
//------------ Import utils ------------//
import getLogLevels from './common/utils/getLogLevels';
import { css } from './common/utils/swagger-ui/SwaggerDarl.css';
//------------ Import modules ------------//
import { AppModule } from './app.module';
import { AuditLogInterceptor } from './common/interceptors/auditlog.interceptor';
import { ExceptionInterceptor } from './common/interceptors/exception.interceptor';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

function initBullBoard(app: any, redisOptions: Queue.QueueOptions) {
  const serverAdapter = new ExpressAdapter();
  serverAdapter.setBasePath('/api/admin/queues');
  const mailQueue = new Queue(VISIT_QUEUE, { ...redisOptions });
  createBullBoard({
    queues: [new BullAdapter(mailQueue)],
    serverAdapter,
  });
  app.use('/api/admin/queues', serverAdapter.getRouter());
}

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    // get env
    const configService = app.get(ConfigService);
    const PORT = configService.get<number>('PORT');
    const NODE_ENV = configService.get<string>('NODE_ENV');
    // setup application
    // Validation
    app.useGlobalPipes(new ValidationPipe());
    app.useLogger(getLogLevels(NODE_ENV === 'production'));
    app.useGlobalFilters(new GqlExceptionFilter());
    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalInterceptors(new AuditLogInterceptor());
    app.useGlobalInterceptors(new ExceptionInterceptor());
    app.useGlobalInterceptors(new TransformInterceptor());
    // set real ip
    const config = new DocumentBuilder()
      .setTitle('OpenAPI Main')
      .setDescription('The OpenAPI description')
      .setVersion('dev:1.0')
      .addBearerAuth(
        { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
        'Authorization',
      )
      .addApiKey(
        {
          type: 'apiKey',
          scheme: 'x-api-key',
          name: 'x-api-key',
          in: 'header',
        },
        'x-api-key',
      )
      .build();
    const document = SwaggerModule.createDocument(app, config);
    const swaggerOptions = {};
    if (configService.get('SWAGGER_DARK')) {
      swaggerOptions['customCss'] = css.toString();
    }
    SwaggerModule.setup('api/docs', app, document, swaggerOptions);
    initBullBoard(app, {
      redis: {
        port: configService.get('REDIS_PORT'),
        host: configService.get('REDIS_HOST'),
      },
    });
    await app.listen(PORT);
  } catch (error) {
    Logger.error(`❌  Error starting server, ${error}`, '', 'Bootstrap', false);
    process.exit();
  }
}
bootstrap().catch((e) => {
  Logger.error(`❌  Error starting server, ${e}`, '', 'Bootstrap', false);
  throw e;
});
