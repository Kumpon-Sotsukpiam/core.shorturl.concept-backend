import { BadRequestException, HttpStatus } from '@nestjs/common';
import { ExceptionCodes } from '../code.exception';

export class ValidationException extends BadRequestException {
  constructor(errors: any) {
    super({
      message: 'Argument Validation Error',
      statusCode: HttpStatus.BAD_REQUEST,
      error: ExceptionCodes.ARG_VALIDATION_ERROR,
      errors: errors,
    });
  }
}
