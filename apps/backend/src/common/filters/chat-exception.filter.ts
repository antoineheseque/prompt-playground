import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import {
  InvalidApiKeyError,
  ModelNotFoundError,
  RateLimitError,
  UpstreamError,
} from '../errors';

@Catch()
export class ChatExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let body: Record<string, unknown> = {
      statusCode: status,
      message: 'Internal server error',
    };

    if (exception instanceof HttpException) {
      const res = exception.getResponse();
      response.status(exception.getStatus()).json(res);
      return;
    }

    if (exception instanceof InvalidApiKeyError) {
      status = HttpStatus.UNAUTHORIZED;
      body = {
        statusCode: status,
        message: exception.message || 'Invalid API key',
      };
    } else if (exception instanceof ModelNotFoundError) {
      status = HttpStatus.NOT_FOUND;
      body = {
        statusCode: status,
        message: exception.message || 'Model not found',
      };
    } else if (exception instanceof RateLimitError) {
      status = HttpStatus.TOO_MANY_REQUESTS;
      body = {
        statusCode: status,
        message: exception.message || 'Rate limit exceeded',
      };
    } else if (exception instanceof UpstreamError) {
      status = HttpStatus.BAD_GATEWAY;
      body = {
        statusCode: status,
        message: exception.message || 'Upstream service error',
      };
    }

    response.status(status).json(body);
  }
}
