import { Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import {
	MessageBody,
	SubscribeMessage,
	OnGatewayConnection,
	ConnectedSocket,
	WebSocketGateway,
	WebSocketServer,
	OnGatewayDisconnect, WsException,
} from '@nestjs/websockets';
import { ChatService } from '../application';

@Injectable()
@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
	@WebSocketServer()
	websocketServer: Server;

	constructor(private chatService: ChatService) {}

	async handleConnection(socket: Socket) {
		await this.chatService.getUserFromSocket(socket);
	}

	handleDisconnect(socket: Socket) {
		console.log('disconnect', { socket });
	}

	@SubscribeMessage('send_message')
	async listenForMessages(
		@MessageBody() message: string,
		@ConnectedSocket() socket: Socket
	) {
		const userFromSocket = await this.chatService.getUserFromSocket(socket);

		if (userFromSocket) {

			this.websocketServer.emit('receive_message', { data: { message, author: { username: userFromSocket.username }} });
		}

		throw new WsException("User doesn't exist")
	}
}
