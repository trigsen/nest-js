import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

import { ChatDomain } from '../domain/chat.domain';

@Injectable()
export class ChatService {
	constructor(private chatDomain: ChatDomain) {}

	async addMessage(message: string, authorName: string) {
		return this.chatDomain.addMessage(message, authorName)
	}

	async getAllMessages() {
		return this.chatDomain.getAllMessages()
	}

	async getUserFromSocket(socket: Socket) {
		return this.chatDomain.getUserFromSocket(socket);
	}
}
