import { ForbiddenException } from '@nestjs/common';

export class RegitrationNotAllowedException extends ForbiddenException {
  constructor() {
    super('Registration is not allowed.', 'AUTH.REGISTRATION_NOT_ALLOWED');
  }
}
