import {Inject, Injectable} from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';

import {AuthDomain} from "../../auth/domain";
import { UsersDomain } from '../../users/domain';
import {AUTHOR_REPOSITORY_TOKEN} from "../core/tokens/author-repository.token";
import {CHAT_REPOSITORY_TOKEN} from "../core/tokens/chat-repository.token";
import {ChatRepository} from "../infastructure";
import {AuthorRepository} from "../infastructure/repositories/author.repository";

@Injectable()
export class ChatDomain {
	constructor(
		private authDomain: AuthDomain,
		private usersDomain: UsersDomain,
		@Inject(CHAT_REPOSITORY_TOKEN)
		private chatRepository: ChatRepository,
		@Inject(AUTHOR_REPOSITORY_TOKEN)
		private authorRepository: AuthorRepository,
	) {}

	async addMessage(message: string, authorName: string) {
		const alreadyExistingAuthor = await this.authorRepository.findAuthorByUsername(authorName)

		if (alreadyExistingAuthor) {
			return this.chatRepository.addMessage(message, alreadyExistingAuthor)
		}

		const newAuthor = await this.authorRepository.addAuthor(authorName)

		return this.chatRepository.addMessage(message, newAuthor)
	}

	async getAllMessages() {
		return this.chatRepository.getAllMessages()
	}

	async getUserFromSocket(socket: Socket) {
		if (socket.handshake.headers.authorization) {
			const [, token] = socket.handshake.headers.authorization.split(' ');

			if (token) {
				// @ TODO move to .env
				const jwtPayload = await this.authDomain.verifyAccessToken(token)

				if (jwtPayload.sub) {
					return this.usersDomain.getUserById(jwtPayload.sub);
				}
			}
		}

		throw new WsException('Invalid credentials.');
	}
}
