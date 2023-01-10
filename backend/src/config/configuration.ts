import { applicationConfiguration } from './application';
import { jwtConfiguration } from './jwt';
import { mongoConfiguration } from './mongo';

export const configuration = [
	applicationConfiguration,
	jwtConfiguration,
	mongoConfiguration,
];
