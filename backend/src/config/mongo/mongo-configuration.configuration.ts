import { MongoConfigurationInterface } from './mongo-configuration.interfaces';

export const mongoConfiguration = (): MongoConfigurationInterface => ({
	mongo: {
		connectUrl: process.env.MONGO_DB_CONNECT_LINK!,
	},
});
