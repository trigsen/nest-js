import { HttpException, Injectable } from '@nestjs/common';

import { UsersService } from '../../users/application';
import { AuthDomain } from '../domain';

import { CryptoService } from '@app/crypto';

import {
	LoginUserParameters,
	RegisterUserParameters,
	ValidateUserParameters,
	ValidateUserResult,
} from './auth-service.types';

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private cryptoService: CryptoService,
		private authDomain: AuthDomain
	) {}

	async login({ username }: LoginUserParameters) {
		const user = await this.usersService.getUserByUsername(username);

		if (!user) {
			throw new HttpException("User doesn't exist", 500);
		}

		const accessToken = await this.authDomain.generateAccessToken(
			user.username,
			user.id
		);

		return {
			access_token: accessToken,
		};
	}

	async register({ username, password }: RegisterUserParameters) {
		const user = await this.usersService.getUserByUsername(username);

		if (user) {
			throw new HttpException('User already exists', 500);
		}

		const encodedPassword = await this.cryptoService.encodePassword(password);

		const { username: newUserName, id } = await this.usersService.createUser(
			username,
			encodedPassword
		);

		const accessToken = await this.authDomain.generateAccessToken(
			newUserName,
			id
		);

		return {
			access_token: accessToken,
		};
	}

	async validateUser({
		username,
		password: userPassword,
	}: ValidateUserParameters): Promise<ValidateUserResult | null> {
		const user = await this.usersService.getUserByUsername(username);
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
