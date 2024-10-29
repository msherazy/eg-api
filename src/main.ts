import * as process from 'node:process';

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';

import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/all-exceptoion.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const applicationLogger = new Logger('AppInfo');

	// Enable CORS and allow credentials if needed
	app.enableCors({
		origin: ['http://localhost:5173'], // Frontend URL
		methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
		credentials: true, // Allow cookies, if needed
	});

	app.use(helmet());

	app.useGlobalInterceptors(new ResponseInterceptor());
	app.useGlobalInterceptors(new LoggingInterceptor());
	app.useGlobalFilters(new AllExceptionsFilter());

	app.setGlobalPrefix('api/v1');
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			transform: true,
		}),
	);

	const config = new DocumentBuilder()
		.setTitle('Rest API')
		.setDescription('documentation for rest API')
		.setVersion('1.0')
		.addTag('swagger')
		.addBearerAuth()
		.build();
	const documentFactory = () => SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api/documentation', app, documentFactory);

	await app.listen(process.env.PORT ?? 3000);
	applicationLogger.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
