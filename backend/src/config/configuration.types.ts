import { ApplicationConfigurationInterface } from './application';
import { JwtConfigurationInterface } from './jwt';
import { MongoConfigurationInterface } from './mongo';

export interface Config
	extends ApplicationConfigurationInterface,
		JwtConfigurationInterface,
		MongoConfigurationInterface {}
