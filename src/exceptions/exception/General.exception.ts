import {
  InternalServerErrorException as InternalServerErrorExceptionClass,
  UnauthorizedException as UnauthorizedExceptionClass,
} from '@nestjs/common';
import { ExceptionCodes } from '../code.exception';

export class InternalServerErrorException extends InternalServerErrorExceptionClass {
  constructor() {
    super('Something went wrong', ExceptionCodes.GENERAL_INTERNEL_SERVER_ERROR);
  }
}
export class UnauthorizedException extends UnauthorizedExceptionClass {
  constructor() {
    super(undefined, ExceptionCodes.GENERAL_UNAUTHORIZED);
  }
}
