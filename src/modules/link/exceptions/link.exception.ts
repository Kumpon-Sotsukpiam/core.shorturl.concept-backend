import { NotFoundException } from '@nestjs/common';

export class LinkNotFoundException extends NotFoundException {
  constructor() {
    super('Link with this id does not exist', 'LINK.NOT_FOUND');
  }
}
