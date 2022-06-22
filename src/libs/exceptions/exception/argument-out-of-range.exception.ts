import { ExceptionBase } from '../base/exception.base';
import { ExceptionCodes } from '../base/exception.codes';

export class ArgumentOutOfRangeException extends ExceptionBase {
  readonly code = ExceptionCodes.argumentOutOfRange;
}
