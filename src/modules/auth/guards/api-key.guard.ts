import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class ApiKeyGuard extends AuthGuard('x-api-key') {
  constructor(private reflector: Reflector) {
    super();
  }
  canActivate(context: ExecutionContext) {
    const request: Request | any = context.switchToHttp().getRequest();
    if (request && request.query['x-api-key'] && !request.header('x-api-key')) {
      (request.headers['x-api-key'] as any) = request.query['x-api-key'];
    }
    return super.canActivate(context);
  }
}
