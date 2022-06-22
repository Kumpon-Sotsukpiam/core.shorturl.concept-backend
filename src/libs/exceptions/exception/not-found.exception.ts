import { ExceptionBase } from '../base/exception.base';
import { ExceptionCodes } from '../base/exception.codes';

export class NotFoundException extends ExceptionBase {
  constructor(message = 'Not found') {
    super(message);
  }

  readonly code = ExceptionCodes.notFound;
}
