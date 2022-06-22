import { ExceptionBase } from '../base/exception.base';
import { ExceptionCodes } from '../base/exception.codes';

export class ArgumentInvalidException extends ExceptionBase {
  readonly code = ExceptionCodes.argumentInvalid;
}
