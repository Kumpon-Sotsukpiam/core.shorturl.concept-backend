import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  Logger,
  // To avoid confusion between internal app exceptions and NestJS exceptions
  ConflictException as NestConflictException,
  NotFoundException as NestNotFoundException,
  Injectable,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  ExceptionBase,
  ConflictException,
  NotFoundException,
} from '../../libs/exceptions';

@Injectable()
export class ExceptionInterceptor implements NestInterceptor {
  private readonly logger = new Logger(ExceptionInterceptor.name);
  intercept(
    _context: ExecutionContext,
    next: CallHandler,
  ): Observable<ExceptionBase> {
    return next.handle().pipe(
      catchError((err) => {
        /**
         * Custom exceptions are converted to nest.js exceptions.
         * This way we are not tied to a framework or HTTP protocol.
         */
        this.logger.error(err);
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
          this.logger.error('Prisma KnownRequestError: ' + err?.code);
        }
        if (err instanceof NotFoundException) {
          throw new NestNotFoundException(err.message);
        }
        if (err instanceof ConflictException) {
          throw new NestConflictException(err.message);
        }
        return throwError(err);
      }),
    );
  }
}
