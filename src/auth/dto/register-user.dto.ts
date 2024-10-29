import { ApiProperty } from '@nestjs/swagger';
import {
	IsEmail,
	IsNotEmpty,
	IsString,
	Matches,
	MinLength,
} from 'class-validator';

export class RegisterUserDto {
	@ApiProperty({
		description: 'email of user. must be unique',
		example: 'user@example.com',
	})
	@IsEmail()
	@IsNotEmpty()
	email: string;

	@ApiProperty({
		description:
			'password, must be atleast 6 characters, 1 uppercase, 1 lowercase',
		example: 'Abcd123!',
	})
	@IsString()
	@MinLength(6, { message: 'Password must be at least 6 characters long.' })
	@Matches(
		/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\S]{6,}$/,
		{
			message:
				'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
		},
	)
	password: string;

	@ApiProperty({
		description: 'full name',
		example: 'john doe',
	})
	@IsNotEmpty()
	name: string;
}
