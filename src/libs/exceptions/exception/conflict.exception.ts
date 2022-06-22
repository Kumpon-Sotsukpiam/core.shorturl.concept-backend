import { ExceptionBase } from '../base/exception.base';
import { ExceptionCodes } from '../base/exception.codes';

export class ConflictException extends ExceptionBase {
  readonly code = ExceptionCodes.conflict;
}
