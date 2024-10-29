import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginUserDto {
	@ApiProperty({
		description: 'registered email',
		example: 'user@example.com',
	})
	@IsEmail()
	@IsNotEmpty()
	email: string;

	@ApiProperty({
		description: 'password of user',
		example: 'Abcd123!',
	})
	@IsNotEmpty()
	password: string;
}
