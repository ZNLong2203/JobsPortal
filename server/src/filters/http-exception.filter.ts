import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let message = 'Internal server error';
    if (exception instanceof HttpException) {
      const response = exception.getResponse();
      if (typeof response === 'string') {
        message = response;
      } else if (typeof response === 'object' && (response as any).message) {
        const errorResponse = response as { message: string | string[] };
        message = Array.isArray(errorResponse.message)
          ? errorResponse.message.join(', ')
          : errorResponse.message;
      }
    }

    response.status(status).json({
      success: false,
      statusCode: status,
      message,
      error: exception.name || 'InternalServerError',
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
