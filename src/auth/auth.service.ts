import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserDto } from '../users/dto/user.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService
	) {}

	async login(user: UserDto) {
		const payload = { username: user.username, sub: user.userId };
		return {
			access_token: this.jwtService.sign(payload),
		};
	}

	async validateUser(
		username: string,
		password: string
	): Promise<Omit<UserDto, 'password'> | null> {
		const user = await this.usersService.findOne(username);
		if (user && user.password === password) {
			const { password, ...result } = user;
			return result;
		}
		return null;
	}
}
