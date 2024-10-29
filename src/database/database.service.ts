import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class DatabaseService implements OnModuleInit {
	private readonly logger: Logger = new Logger(DatabaseService.name);

	constructor(@InjectConnection() private readonly connection: Connection) {}

	async onModuleInit() {
		try {
			await this.connection.asPromise();
			this.logger.log('MongoDB connection successful');
		} catch (error) {
			this.logger.error('MongoDB connection error:', error);
		}
	}

	getDatabaseStatus(): { status: string; details?: string } {
		const states = {
			0: 'disconnected',
			1: 'connected',
			2: 'connecting',
			3: 'disconnecting',
		};
		const status = states[this.connection.readyState] || 'unknown';
		return { status };
	}
}
