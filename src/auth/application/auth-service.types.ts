export interface RegisterUserParameters {
	username: string;
	password: string;
}

export interface LoginUserParameters {
	username: string;
}

export interface ValidateUserParameters {
	username: string;
	password: string;
}

export interface ValidateUserResult {
	id: string;
	username: string;
}
