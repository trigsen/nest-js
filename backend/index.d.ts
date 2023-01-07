declare namespace Express {
	export interface Request {
		user: {
			hashedRefreshToken: string
			id: string;
			username: string;
		};
	}
}
