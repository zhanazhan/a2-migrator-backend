import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { AssessmentException } from '@/core/exceptions/assessment.exception';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger('AllExceptionsFilter');

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    try {
      if (
        exception instanceof NotFoundException &&
        request.url.includes('.well-known/appspecific')
      ) {
        return;
      }
      const status =
        exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR;

      const exceptionResponse =
        exception instanceof HttpException ? exception.getResponse() : null;

      const errorResponse = {
        statusCode: status,
        error:
          exception instanceof AssessmentException
            ? (exceptionResponse as AssessmentException).cause || 'Error'
            : 'InternalServerError',
        message:
          exception instanceof HttpException
            ? (exceptionResponse as AssessmentException).message ||
              exception.message
            : 'Unexpected error occurred',
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        details:
          exception instanceof HttpException
            ? (exceptionResponse as AssessmentException).details || null
            : null,
        timestamp: new Date().toISOString(),
        path: request.url,
      };

      response.status(status).json(errorResponse);
    } catch (e) {
      this.logger.error(`Assessment Error: ${JSON.stringify(e)}`);
      response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json('unexpected exception occurred');
    }
  }
}
