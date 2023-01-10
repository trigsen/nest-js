export interface RegisterUserParameters {
	password: string;
	username: string;
}

export interface LoginUserParameters {
	username: string;
}

export interface ValidateUserParameters {
	password: string;
	username: string;
}

export interface ValidateUserResult {
	id: string;
	username: string;
}

export interface ValidateTokenResult {
	sub: string;
	username: string;
}
