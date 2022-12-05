import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import {ValidateTokenResult} from "../application/auth-service.types";

@Injectable()
export class AuthDomain {
	constructor(private jwtService: JwtService) {}

	async generateAccessToken(username: string, id: string) {
		return this.jwtService.signAsync({
			username,
			sub: id,
		});
	}

	async verifyAccessToken(token: string) {
		return this.jwtService.verifyAsync<ValidateTokenResult>(token, {
			secret: 'secret',
		});
	}
}
