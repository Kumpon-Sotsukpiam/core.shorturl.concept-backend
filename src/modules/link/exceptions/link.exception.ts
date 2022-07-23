import { ConflictException, NotFoundException } from '@nestjs/common';

export class LinkNotFoundException extends NotFoundException {
  constructor() {
    super('Link with this id does not exist', 'LINK.NOT_FOUND');
  }
}
export class LinkAlreadyExistsException extends ConflictException {
  constructor() {
    super('Custom URL is already in use.', 'LINK.ALREADY_EXISTS');
  }
}
