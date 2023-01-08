import {Inject, Injectable} from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';

import {AuthDomain} from "../../auth/domain";
import { UsersDomain } from '../../users/domain';
import {CHAT_REPOSITORY_TOKEN} from "../core/tokens/chat-repository.token";
import {ChatRepository} from "../infastructure";

@Injectable()
export class ChatDomain {
	constructor(
		private authDomain: AuthDomain,
		private usersDomain: UsersDomain,
		@Inject(CHAT_REPOSITORY_TOKEN)
		private chatRepository: ChatRepository,
	) {}

	async addMessage(message: string, authorName: string, roomId: string) {
		return this.chatRepository.addMessageInRoom(message, authorName, roomId)
	}

	async createRoom(username: string, roomName: string) {
		const room = await this.chatRepository.createRoom(username, roomName)
		console.log({ room })

		return room
	}

	async getAllMessages(roomId: string) {
		return this.chatRepository.getAllMessagesInRoom(roomId)
	}

	async getUserFromSocket(socket: Socket) {
		if (socket.handshake.headers.authorization) {
			const [, token] = socket.handshake.headers.authorization.split(' ');

			if (token) {
				const jwtPayload = await this.authDomain.verifyAccessToken(token)

				if (jwtPayload.sub) {
					return this.usersDomain.getUserById(jwtPayload.sub);
				}
			}
		}

		throw new WsException('Invalid credentials.');
	}

	async getRooms() {
		return this.chatRepository.getRooms()
	}
}
