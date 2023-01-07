import { Inject, Injectable } from '@nestjs/common';

import {UserToUpdate} from "../core/interfaces";
import { USERS_REPOSITORY_TOKEN } from '../core/tokens';
import {UsersRepository} from '../infastructure';

import {CryptoService} from "@app/crypto";

@Injectable()
export class UsersDomain {
	constructor(
		@Inject(USERS_REPOSITORY_TOKEN)
		private readonly usersRepository: UsersRepository,
		private readonly cryptoService: CryptoService,
	) {}

	async createUser(username: string, password: string) {
		return this.usersRepository.addUser(username, password);
	}

	async getUserById(id: string) {
		return this.usersRepository.findUserById(id);
	}

	async getUserByIdAndRefreshToken(refreshToken: string, userId: string) {
		const user = await this.usersRepository.findUserById(userId)

		if (!user) {
			return null
		}

		const isRefreshTokenMatches = await this.cryptoService.compareHashedText(refreshToken, user.hashedRefreshToken)

		console.log({ isRefreshTokenMatches, refreshToken, hashedRefreshToken: user.hashedRefreshToken })

		return isRefreshTokenMatches ? user : null
	}

	async getUserByUsername(username: string) {
		return this.usersRepository.findUserByUsername(username)
	}

	async getUserByUsernameWithPassword(username: string) {
		return this.usersRepository.findUserByUsername(username);
	}

	async updateUser(id: string, updatedUser: UserToUpdate) {
		return this.usersRepository.updateUser(id, updatedUser)
	}
}
