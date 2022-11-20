import { IsNumber, IsString } from 'class-validator';

export class AuthUserDto {
	@IsNumber()
	id: number;

	@IsString()
	username: string;
}
