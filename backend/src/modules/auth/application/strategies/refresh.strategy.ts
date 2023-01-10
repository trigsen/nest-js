import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { Config, JwtConfigurationInterface } from '../../../../config';
import { UsersService } from '../../../users/application';

import { ValidateJwtStrategyResult } from './strategy.types';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
	Strategy,
	'jwt-refresh-token'
) {
	constructor(
		private readonly configService: ConfigService<Config, true>,
		private readonly usersService: UsersService
	) {
		super({
			jwtFromRequest: ExtractJwt.fromExtractors([
				(request: Request) => {
					return request.cookies?.Refresh;
				},
			]),
			secretOrKey:
				configService.get<JwtConfigurationInterface['jwt']>('jwt')
					.refreshSecret,
			passReqToCallback: true,
		});
	}

	async validate(request: Request, payload: ValidateJwtStrategyResult) {
		const refreshToken = request.cookies?.Refresh;
		return this.usersService.getUserByIdAndRefreshToken(
			refreshToken,
			payload.sub
		);
	}
}
