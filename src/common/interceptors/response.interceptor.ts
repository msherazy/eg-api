// src/common/interceptors/response.interceptor.ts

import {
	CallHandler,
	ExecutionContext,
	Injectable,
	NestInterceptor,
} from '@nestjs/common';
import { format } from 'date-fns';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export type Response<T> = {
	success: boolean;
	path: string;
	message: string;
	statusCode: number;
	data: T;
	timestamp: string;
};

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
	intercept(
		context: ExecutionContext,
		next: CallHandler,
	): Observable<Response<T>> {
		return next
			.handle()
			.pipe(map((res: any) => this.responseHandler(res, context)));
	}

	responseHandler(res: any, context: ExecutionContext): Response<any> {
		const ctx = context.switchToHttp();
		const response = ctx.getResponse();
		const request = ctx.getRequest();
		const statusCode = response.statusCode;

		// Extract message and data from controller response
		const { message, data } = res;

		return {
			success: true,
			path: request.url,
			message: message || 'Request processed successfully', // Use provided message or default
			statusCode: statusCode,
			data: data,
			timestamp: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
		};
	}
}
