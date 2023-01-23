import { JwtConfigurationInterface } from './jwt-configuration.interfaces';

export const jwtConfiguration = (): JwtConfigurationInterface => {
	console.log({ process: process.env })

	return ({
		jwt: {
			accessExpiringMs: parseInt(process.env.ACCESS_TOKEN_EXPIRING_MS!, 10),
			accessSecret: process.env.ACCESS_TOKEN_SECRET_KEY!,
			refreshExpiringMs: parseInt(process.env.REFRESH_TOKEN_EXPIRING_MS!, 10),
			refreshSecret: process.env.REFRESH_TOKEN_SECRET_KEY!,
		},
	});
}

