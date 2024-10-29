import {
	Body,
	Controller,
	Get,
	Post,
	Request,
	UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { AuthenticatedRequest } from '../common/interfaces';
import { AuthService } from './auth.service';
import { LoginUserDto, RegisterUserDto } from './dto';
import { JwtAuthGuard } from './guards';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('register')
	async registerUser(@Body() registerUserDto: RegisterUserDto) {
		const data = await this.authService.register(registerUserDto);
		return { message: 'User Registered Successfully', data };
	}

	@Post('login')
	async loginUser(@Body() loginUserDto: LoginUserDto) {
		const data = await this.authService.login(loginUserDto);
		return { message: 'User Logged in Successfully', data };
	}

	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard)
	@Get('profile')
	async getProfile(@Request() req: AuthenticatedRequest) {
		return { message: 'User profile retrieved successfully', data: req.user };
	}
}
