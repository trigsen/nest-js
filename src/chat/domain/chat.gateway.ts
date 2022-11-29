import { Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import {
	MessageBody,
	SubscribeMessage,
	OnGatewayConnection,
	ConnectedSocket,
} from '@nestjs/websockets';
import { ChatService } from './chat.domain';

@Injectable()
export class ChatGateway implements OnGatewayConnection {
	websocketServer: Server;

	constructor(private chatService: ChatService) {}

	async handleConnection(socket: Socket) {
		await this.chatService.getUserFromSocket(socket);
	}

	@SubscribeMessage('send_message')
	listenForMessages(
		@MessageBody() message: string,
		@ConnectedSocket() socket: Socket
	) {
		const author = this.chatService.getUserFromSocket(socket);
		this.websocketServer.emit('receive_message', { message, author });
	}
}
