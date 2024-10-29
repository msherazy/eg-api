import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { UserService } from '../../user';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		private configService: ConfigService,
		private usersService: UserService,
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: configService.get<string>('ACCESS_TOKEN_SECRET'),
		});
	}

	async validate(payload: { id: string }) {
		const { id } = payload;
		const user = await this.usersService.findById(id);
		if (!user) {
			throw new UnauthorizedException('You are not Logged in');
		}
		return user;
	}
}
