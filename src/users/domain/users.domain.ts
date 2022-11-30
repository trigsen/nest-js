import { Inject, Injectable } from '@nestjs/common';

import { USERS_REPOSITORY_TOKEN } from '../core/tokens';
import { UsersRepository } from '../infastructure/repositories/users.repository';

@Injectable()
export class UsersDomain {
	constructor(
		@Inject(USERS_REPOSITORY_TOKEN)
		private readonly usersRepository: UsersRepository
	) {}

	async createUser(username: string, password: string) {
		return this.usersRepository.addUser(username, password);
	}

	async getUserById(id: string) {
		return this.usersRepository.findUserById(id);
	}

	async getUserByUsername(username: string) {
		return this.usersRepository.findUserByUsername(username);
	}
}
