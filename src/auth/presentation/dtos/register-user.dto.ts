import { IsNotEmpty, IsString } from 'class-validator';

export class RegisterUserDto {
	@IsNotEmpty()
	@IsString()
	password: string;

	@IsNotEmpty()
	@IsString()
	username: string;
}
