import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { hashPassword } from '../utils';
import { User } from './schemas';

@Injectable()
export class UserService {
	private readonly logger: Logger = new Logger(UserService.name);

	constructor(@InjectModel(User.name) private userModel: Model<User>) {}

	async createUser(user: User) {
		const hashedPassword = await hashPassword(user.password);

		const createdUser = new this.userModel({
			...user,
			password: hashedPassword,
		});

		return (await createdUser.save()).toObject();
	}

	async findById(id: string) {
		return this.userModel.findById(id);
	}

	async isUserExist(email: string) {
		return this.userModel.exists({ email });
	}

	async findByEmail(email: string) {
		return this.userModel.findOne({ email }).lean();
	}

	async findByEmailWithPassword(email: string) {
		return this.userModel.findOne({ email }).select('+password').lean();
	}
}
