import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

//------------ Import commons ------------//
import { ValidationPipe } from './common/pipes/validation.pipe';
import { GqlExceptionFilter } from './common/filters/graphql-exceptoin.filter';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
//------------ Import utils ------------//
import getLogLevels from './utils/getLogLevels';
import { css } from './utils/swagger-ui/SwaggerDarl.css';
//------------ Import modules ------------//
import { AppModule } from './app.module';
import { AuditLogInterceptor } from './common/interceptors/auditlog.interceptor';
import { ExceptionInterceptor } from './common/interceptors/exception.interceptor';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

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
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new ValidationPipe());
    app.useLogger(getLogLevels(NODE_ENV === 'production'));
    app.useGlobalFilters(new GqlExceptionFilter());
    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalInterceptors(new AuditLogInterceptor());
    app.useGlobalInterceptors(new ExceptionInterceptor());
    app.useGlobalInterceptors(new TransformInterceptor());
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
