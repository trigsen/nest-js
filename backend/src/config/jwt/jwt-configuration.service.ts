import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';

import { Config } from '../configuration.types';

import { JwtConfigurationInterface } from './jwt-configuration.interfaces';

@Injectable()
export class JwtConfigurationService implements JwtOptionsFactory {
	constructor(private configService: ConfigService<Config, true>) {}

	createJwtOptions(): Promise<JwtModuleOptions> | JwtModuleOptions {
		const { accessSecret, accessExpiringMs } =
			this.configService.get<JwtConfigurationInterface['jwt']>('jwt');

		return {
			secret: accessSecret,
			signOptions: { expiresIn: accessExpiringMs },
		};
	}
}
