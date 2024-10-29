import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { DatabaseController } from './database.controller';
import { DatabaseService } from './database.service';

@Global()
@Module({
	imports: [
		ConfigModule,
		MongooseModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: async (configService: ConfigService) => ({
				uri: configService.get<string>('DB_URI'),
				dbName: configService.get<string>('DB_NAME'),
			}),
			inject: [ConfigService],
		}),
	],
	controllers: [DatabaseController],
	providers: [DatabaseService],
	exports: [MongooseModule],
})
export class DatabaseModule {}
