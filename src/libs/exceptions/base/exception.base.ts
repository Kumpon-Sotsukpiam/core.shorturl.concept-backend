import { SerializedException } from '../interfaces/serialized-exception.interface';

/**
 * interface Error {
    name: string;
    message: string;
    stack?: string;
  }
*/

export abstract class ExceptionBase extends Error {
  abstract code: string;

  constructor(readonly message: string, readonly metadata?: unknown) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
  }

  toJSON(): SerializedException {
    return {
      message: this.message,
      code: this.code,
      stack: this.stack,
      metadata: this.metadata,
    };
  }
}
