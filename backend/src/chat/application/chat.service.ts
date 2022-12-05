import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

import { ChatDomain } from '../domain/chat.domain';

@Injectable()
export class ChatService {
	constructor(private chatDomain: ChatDomain) {}

	async getUserFromSocket(socket: Socket) {
		return this.chatDomain.getUserFromSocket(socket);
	}
}
