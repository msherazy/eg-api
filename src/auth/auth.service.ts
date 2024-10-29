import {
	ConflictException,
	Injectable,
	Logger,
	NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '../user';
import { isPasswordValid } from '../utils';
import { LoginUserDto, RegisterUserDto } from './dto';

@Injectable()
export class AuthService {
	private readonly logger: Logger = new Logger(AuthService.name);

	constructor(
		private readonly usersService: UserService,
		private readonly jwtService: JwtService,
	) {}

	async register(user: RegisterUserDto) {
		if (await this.usersService.isUserExist(user.email))
			throw new ConflictException('User Already Exists');
		const createdUser = await this.usersService.createUser(user);
		const { password: _, ...userWithoutPassword } = createdUser;

		return userWithoutPassword;
	}

	async login({ email, password }: LoginUserDto) {
		const user = await this.usersService.findByEmailWithPassword(email);
		if (!user) throw new NotFoundException('Invalid Email/Password');
		if (!(await isPasswordValid({ password, hash: user.password })))
			throw new NotFoundException('Invalid Email/Password');

		const accessToken = this.jwtService.sign({ id: user._id });
		return {
			user,
			accessToken,
		};
	}
}
