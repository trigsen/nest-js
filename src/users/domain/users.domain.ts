import { Inject, Injectable } from '@nestjs/common';

import { USERS_REPOSITORY_TOKEN } from '../core/tokens';
import { UserEntity } from '../infastructure/entities/user.entity';
import { UsersRepository } from '../infastructure/repositories/users.repository';

@Injectable()
export class UsersDomain {
	constructor(
		@Inject(USERS_REPOSITORY_TOKEN)
		private readonly usersRepository: UsersRepository
	) {}

	async create(username: string, password: string) {
		return this.usersRepository.addUser(username, password);
	}

	async findOneById(id: string): Promise<UserEntity | null> {
		return this.usersRepository.findUserById(id);
	}

	async findOneByUsername(username: string): Promise<UserEntity | null> {
		return this.usersRepository.findUserByUsername(username);
	}
}
