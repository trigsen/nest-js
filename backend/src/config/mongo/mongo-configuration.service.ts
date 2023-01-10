import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
	MongooseModuleOptions,
	MongooseOptionsFactory,
} from '@nestjs/mongoose';

import { Config } from '../configuration.types';

import { MongoConfigurationInterface } from './mongo-configuration.interfaces';

@Injectable()
export class MongoConfigurationService implements MongooseOptionsFactory {
	constructor(private configService: ConfigService<Config, true>) {}

	createMongooseOptions():
		| Promise<MongooseModuleOptions>
		| MongooseModuleOptions {
		const { connectUrl } =
			this.configService.get<MongoConfigurationInterface['mongo']>('mongo');

		return {
			uri: connectUrl,
		};
	}
}
