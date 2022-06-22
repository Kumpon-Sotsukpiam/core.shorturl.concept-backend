import { ArgumentsHost, Catch, HttpException } from '@nestjs/common';
import {
  GqlExceptionFilter as GqlExceptionFilterClass,
  GqlArgumentsHost,
} from '@nestjs/graphql';

@Catch(HttpException)
export class GqlExceptionFilter implements GqlExceptionFilterClass {
  catch(exception: HttpException, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);
    return exception;
  }
}
