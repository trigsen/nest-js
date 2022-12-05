import { Injectable } from '@nestjs/common';

import { UsersDomain } from '../domain';

@Injectable()
export class UsersService {
	constructor(private readonly usersDomain: UsersDomain) {}

	async createUser(username: string, password: string) {
		return this.usersDomain.createUser(username, password);
	}

	async getUserById(id: string) {
		return this.usersDomain.getUserById(id);
	}

	async getUserByUsername(username: string) {
		return this.usersDomain.getUserByUsername(username);
	}
}
