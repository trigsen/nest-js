import { HttpException, Injectable } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';

import { UsersDomain } from '../../users/domain';
import { ChatDomain } from '../domain/chat.domain';

@Injectable()
export class ChatService {
	constructor(
		private chatDomain: ChatDomain,
		private usersDomain: UsersDomain
	) {}

	async addMessage(message: string, authorName: string, roomId: string) {
		return this.chatDomain.addMessage(message, authorName, roomId);
	}

	async createRoom(userId: string, roomName: string) {
		const user = await this.usersDomain.getUserById(userId);

		if (!user) {
			throw new HttpException("User doesn't exist", 500);
		}

		return this.chatDomain.createRoom(user.username, roomName);
	}

	async getAllMessages(roomId: string) {
		return this.chatDomain.getAllMessages(roomId);
	}

	async getRooms() {
		return this.chatDomain.getRooms();
	}

	async getUserFromSocket(socket: Socket) {
		return this.chatDomain.getUserFromSocket(socket);
	}
}
