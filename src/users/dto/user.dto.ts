import { IsString, IsNumber } from 'class-validator';

export class UserDto {
	@IsString()
	password: string;

	@IsNumber()
	userId: number;

	@IsString()
	username: string;
}
