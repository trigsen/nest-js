import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ValidateJwtStrategyResult } from './strategy.types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			// @ TODO move to .env
			secretOrKey: 'secret',
		});
	}

	validate(payload: ValidateJwtStrategyResult) {
		return { id: payload.sub, username: payload.username };
	}
}
