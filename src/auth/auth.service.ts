import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserDto } from '../users/dto/user.dto';
import { UsersService } from '../users/users.service';

import { CryptoService } from '@app/crypto';

import { AuthUserDto } from './dto/auth-user.dto';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService,
		private cryptoService: CryptoService
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
		const user = await this.usersService.findOne(username);

		if (user) {
			throw new HttpException('User already exists', 500);
		}

		const encodedPassword = await this.cryptoService.encodePassword(password);

		const newUser = await this.usersService.create(username, encodedPassword);
		return this.login(newUser);
	}

	async validateUser({
		username,
		password: userPassword,
	}: AuthDto): Promise<AuthUserDto | null> {
		const user = await this.usersService.findOne(username);

		if (user) {
			const isTheSamePassword = await this.cryptoService.comparePasswords(
				userPassword,
				user.password
			);

			if (isTheSamePassword) {
				const { password, ...result } = user;
				return result;
			}
		}
		return null;
	}
}
