import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import {ValidateTokenResult} from "../application/auth-service.types";
import {JwtConfigurationInterface} from "../../../config/jwt";
import {ConfigService} from "@nestjs/config";
import {Config} from "../../../config";

@Injectable()
export class AuthDomain {
	constructor(private jwtService: JwtService, private configService: ConfigService<Config, true>) {}

	async generateAccessToken(username: string, id: string) {
		return this.jwtService.signAsync({
			username,
			sub: id,
		});
	}

	async verifyAccessToken(token: string) {
		return this.jwtService.verifyAsync<ValidateTokenResult>(token, {
			secret: this.configService.get<JwtConfigurationInterface['jwt']>('jwt').secret,
		});
	}
}
