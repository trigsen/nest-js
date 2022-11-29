import { IsString } from 'class-validator';

export class AuthUserDto {
	@IsString()
	id: string;

	@IsString()
	username: string;
}
