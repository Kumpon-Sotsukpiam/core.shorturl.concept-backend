import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter<HttpException> {
  catch(exception: HttpException, host: ArgumentsHost) {
    if (host['contextType'] === 'graphql') {
      return;
    }
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const statusCode = exception.getStatus();

    const responseException = exception.getResponse();
    responseException['timestamp'] = new Date().toISOString();
    responseException['path'] = request.url;

    response.status(statusCode).json(responseException);
  }
}
