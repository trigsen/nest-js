import {
	HttpException,
	Injectable,
	InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserDto } from '../users/dto/user.dto';
import { UsersService } from '../users/users.service';

import { AuthUserDto } from './dto/auth-user.dto';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService
	) {}

	login({ username, id }: UserDto) {
		return {
			access_token: this.jwtService.sign({
				username,
				sub: id,
			}),
		};
	}

	async register({ username, password }: AuthDto) {
		console.log('here', username);
		const user = await this.usersService.findOne(username);
		console.log({ usser: user });
		if (user) {
			throw new HttpException('User already exists', 500);
		}

		const newUser = await this.usersService.create(username, password);
		return this.login(newUser);
	}

	async validateUser({
		username,
		password,
	}: AuthDto): Promise<AuthUserDto | null> {
		const user = await this.usersService.findOne(username);
		if (user && user.password === password) {
			const { password, ...result } = user;
			return result;
		}
		return null;
	}
}
