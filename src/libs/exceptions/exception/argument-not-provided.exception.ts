import { ExceptionBase } from '../base/exception.base';
import { ExceptionCodes } from '../base/exception.codes';

export class ArgumentNotProvidedException extends ExceptionBase {
  readonly code = ExceptionCodes.argumentNotProvided;
}
