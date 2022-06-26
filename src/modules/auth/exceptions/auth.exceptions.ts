import {
  ForbiddenException,
  UnauthorizedException as UnauthorizedExceptionClass,
} from '@nestjs/common';

export class RegitrationNotAllowedException extends ForbiddenException {
  constructor() {
    super('Registration is not allowed.', 'AUTH.REGISTRATION_NOT_ALLOWED');
  }
}

export class UnauthorizedException extends UnauthorizedExceptionClass {
  constructor() {
    super('Unauthorized', 'AUTH.UNAUTHENTICATED');
  }
}
