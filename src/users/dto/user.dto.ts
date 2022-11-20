import { IsString, IsNumber } from 'class-validator';

export class UserDto {
	@IsNumber()
	id: number;

	@IsString()
	password: string;

	@IsString()
	username: string;
}
