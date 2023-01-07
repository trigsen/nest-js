import {HttpException, Injectable} from '@nestjs/common';

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

	async generateAccessToken(id: string, username: string) {
		return this.authDomain.generateAccessToken(
			username,
			id
		);
	}

	async generateTokens(id: string, username: string) {
		const accessToken = await this.generateAccessToken(id, username)

		const { refreshToken, cookie } = await this.authDomain.generateRefreshTokenWithCookie(username, id)

		const hashedRefreshToken = await this.cryptoService.hashText(refreshToken)

		await this.usersService.updateUser(id, { hashedRefreshToken })

		return { accessToken, cookie }
	}


	async login({ username }: LoginUserParameters) {
		const user = await this.usersService.getUserByUsername(username);

		if (!user) {
			throw new HttpException("User doesn't exist", 500);
		}

		const { accessToken, cookie } = await this.generateTokens(user.id, user.username)

		return {
			accessToken,
			cookie,
		};
	}

	async register({ username, password }: RegisterUserParameters) {
		const user = await this.usersService.getUserByUsername(username);
		if (user) {
			throw new HttpException('User already exists', 500);
		}

		const encodedPassword = await this.cryptoService.hashPassword(password);

		const { username: newUserName, id } = await this.usersService.createUser(
			username,
			encodedPassword
		);

		const { accessToken, cookie } = await this.generateTokens(id, newUserName)

		return {
			accessToken,
			cookie,
		};
	}

	async refreshAccessToken(userId: string, username: string, refreshToken: string) {
		const user = await this.usersService.getUserByIdAndRefreshToken(refreshToken, userId)

		if (!user) {
			throw new HttpException("User doesn't exist", 500);
		}

		return this.authDomain.generateAccessToken(username, userId)
	}

	async validateUser({
		username,
		password: userPassword,
	}: ValidateUserParameters): Promise<ValidateUserResult | null> {
		const user = await this.usersService.getUserByUsernameWithPassword(username);
		if (user) {
			const isTheSamePassword = await this.cryptoService.compareHashedText(
				userPassword,
				user.password
			);

			if (isTheSamePassword) {
				return user;
			}
		}
		return null;
	}
}
