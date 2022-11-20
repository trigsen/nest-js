import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { UserJwtPayload } from '../interfaces/user-jwt-payload.interface';

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

	async validate(payload: UserJwtPayload) {
		return { id: payload.sub, username: payload.username };
	}
}
