import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { Config, JwtConfigurationInterface } from '../../../config';
import { ValidateTokenResult } from '../application/auth-service.types';

@Injectable()
export class AuthDomain {
	constructor(
		private jwtService: JwtService,
		private configService: ConfigService<Config, true>
	) {}

	async generateAccessToken(username: string, id: string) {
		return this.jwtService.signAsync({
			username,
			sub: id,
		});
	}

	async generateRefreshTokenWithCookie(username: string, id: string) {
		const { refreshSecret, refreshExpiringMs } =
			this.configService.get<JwtConfigurationInterface['jwt']>('jwt');

		const refreshToken = await this.jwtService.signAsync(
			{
				username,
				sub: id,
			},
			{
				secret: refreshSecret,
				expiresIn: refreshExpiringMs,
			}
		);

		const cookie = `Refresh=${refreshToken}; HttpOnly; Path=/; Max-Age=${refreshExpiringMs}`;

		return {
			refreshToken,
			cookie,
		};
	}

	async verifyAccessToken(token: string) {
		return this.jwtService.verifyAsync<ValidateTokenResult>(token, {
			secret:
				this.configService.get<JwtConfigurationInterface['jwt']>('jwt')
					.accessSecret,
		});
	}
}
