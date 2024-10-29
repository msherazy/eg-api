// src/common/filters/all-exceptions.filter.ts

import {
	ArgumentsHost,
	Catch,
	ExceptionFilter,
	HttpException,
	HttpStatus,
} from '@nestjs/common';
import { format } from 'date-fns';
import { Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
	catch(exception: unknown, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const request = ctx.getRequest<Request>();

		const status =
			exception instanceof HttpException
				? exception.getStatus()
				: HttpStatus.INTERNAL_SERVER_ERROR;

		let message: string = 'Internal server error';

		const exceptionResponse =
			exception instanceof HttpException ? exception.getResponse() : {};

		if (typeof exceptionResponse === 'string') {
			message = exceptionResponse;
		} else if (
			typeof exceptionResponse === 'object' &&
			exceptionResponse.hasOwnProperty('message')
		) {
			const msg = exceptionResponse['message'];
			if (Array.isArray(msg)) {
				message = 'Validation Error';
			} else if (typeof msg === 'string') {
				message = msg;
			}
		}

		let errorDetails: any = {};

		if (Array.isArray((exceptionResponse as any).message)) {
			errorDetails = {
				errors: (exceptionResponse as any).message,
			};
		} else if ((exceptionResponse as any).data) {
			errorDetails = (exceptionResponse as any).data;
		}

		const errorResponse = {
			success: false,
			path: request.url,
			message,
			status,
			data: errorDetails,
			timestamp: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
		};

		response.status(status).json(errorResponse);
	}
}
