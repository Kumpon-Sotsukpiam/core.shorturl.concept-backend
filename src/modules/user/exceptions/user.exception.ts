import { ConflictException, BadRequestException } from '@nestjs/common';

export class UserAlreadyExistsException extends ConflictException {
  constructor() {
    super('User with that email already exists', 'USER.ALREADY_EXISTS');
  }
}
export class UserPasswordConfirmNotValid extends BadRequestException {
  constructor() {
    super(
      'Password confirm is not valid',
      'USER.PASSWORD_CONFIRM_IS_NOT_VALID',
    );
  }
}
