import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersDomain } from '../users/domain';

import { CryptoService } from '@app/crypto';

import { AuthUserDto } from './dto/auth-user.dto';
import { AuthDto } from './dto/auth.dto';
import { UserJwtPayload } from './interfaces/user-jwt-payload.interface';

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersDomain,
		private jwtService: JwtService,
		private cryptoService: CryptoService
	) {}

	async generateAccessToken(username: string, id: string) {
		return this.jwtService.signAsync({
			username,
			sub: id,
		});
	}

	async getUserFromJwtToken(jwtToken: UserJwtPayload) {
		return this.usersService.findOneById(jwtToken.sub);
	}

	async login({ username }: any) {
		const user = await this.usersService.findOneByUsername(username);

		if (!user) {
			throw new HttpException("User doesn't exist", 500);
		}

		const accessToken = await this.generateAccessToken(user.username, user.id);

		return {
			access_token: accessToken,
		};
	}

	async register({ username, password }: AuthDto) {
		const user = await this.usersService.findOneByUsername(username);

		if (user) {
			throw new HttpException('User already exists', 500);
		}

		const encodedPassword = await this.cryptoService.encodePassword(password);

		const { username: newUserName, id } = await this.usersService.create(
			username,
			encodedPassword
		);

		const accessToken = await this.generateAccessToken(newUserName, id);

		return {
			access_token: accessToken,
		};
	}

	async validateUser({
		username,
		password: userPassword,
	}: AuthDto): Promise<AuthUserDto | null> {
		const user = await this.usersService.findOneByUsername(username);
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
