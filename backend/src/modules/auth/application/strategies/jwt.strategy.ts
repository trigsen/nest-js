import { Injectable } from '@nestjs/common';
import {ConfigService} from "@nestjs/config";
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import {Config} from "../../../../config";
import {JwtConfigurationInterface} from "../../../../config/jwt";

import { ValidateJwtStrategyResult } from './strategy.types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly configService: ConfigService<Config, true>) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: configService.get<JwtConfigurationInterface['jwt']>('jwt').secret,
		});
	}

	validate(payload: ValidateJwtStrategyResult) {
		return { id: payload.sub, username: payload.username };
	}
}
