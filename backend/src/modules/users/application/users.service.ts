import { Injectable } from '@nestjs/common';

import {UserToUpdate} from "../core/interfaces";
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

	async getUserByIdAndRefreshToken(refreshToken: string, userId: string) {
		return this.usersDomain.getUserByIdAndRefreshToken(refreshToken, userId)
	}

	async getUserByUsername(username: string) {
		return this.usersDomain.getUserByUsername(username);
	}

	async getUserByUsernameWithPassword(username: string) {
		return this.usersDomain.getUserByUsernameWithPassword(username)
	}

	async updateUser(id: string, updatedUser: UserToUpdate) {
		return this.usersDomain.updateUser(id, updatedUser)
	}
}
