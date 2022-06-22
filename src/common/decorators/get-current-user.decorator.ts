import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetCurrentUser = createParamDecorator(
  (key, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    if (!key) return request.user;
    return request.user[key];
  },
);
