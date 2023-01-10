import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';

import { EnvironmentVariables } from './env.schema';

export const validate = (configuration: Record<string, unknown>) => {
	const validatedConfiguration = plainToClass(
		EnvironmentVariables,
		configuration,
		{ enableImplicitConversion: true }
	);
	const errors = validateSync(validatedConfiguration, {
		skipMissingProperties: false,
	});

	if (errors.length) {
		throw new Error(errors.toString());
	}

	return validatedConfiguration;
};
