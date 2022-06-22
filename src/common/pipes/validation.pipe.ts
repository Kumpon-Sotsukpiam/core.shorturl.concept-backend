import {
  Injectable,
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { validate, ValidationError } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { ValidationException } from '../../exceptions';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  private readonly logger = new Logger(ValidationPipe.name);
  async transform(value: any, { metatype }: ArgumentMetadata) {
    // destructuring metadata
    this.logger.debug(value);
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new ValidationException(this.formatErrors(errors));
    }
    return value;
  }
  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
  private formatErrors(errors: ValidationError[]) {
    const _error: object = {};
    for (const { constraints, property } of errors) {
      if (!_error[property]) _error[property] = [];
      const message_errors = Object.values(constraints);
      _error[property] = message_errors;
    }
    return _error;
  }
}
