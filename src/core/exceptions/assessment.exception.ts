import { HttpException, HttpStatus } from '@nestjs/common';

export class AssessmentException extends HttpException {
  constructor(
    public message: string,
    public details?: any,
    status: HttpStatus = HttpStatus.BAD_REQUEST,
  ) {
    super(
      {
        statusCode: status,
        error: 'AssessmentError',
        message,
        details,
      },
      status,
    );
  }
}
