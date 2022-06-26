import { ConflictException } from '@nestjs/common';

export class UserAlreadyExistsException extends ConflictException {
  constructor() {
    super('User with that email already exists', 'USER.ALREADY_EXISTS');
  }
}
