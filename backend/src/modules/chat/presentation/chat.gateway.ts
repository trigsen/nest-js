import { Injectable } from '@nestjs/common';
import {
	MessageBody,
	SubscribeMessage,
	OnGatewayConnection,
	ConnectedSocket,
	WebSocketGateway,
	WebSocketServer,
	OnGatewayDisconnect,
	WsException,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { ChatService } from '../application';
import { ChatEvents } from '../core/constants';

import {
	NewMessageListenerParameters,
	RoomListenerParameters,
} from './interfaces';

@Injectable()
@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
	@WebSocketServer()
	websocketServer: Server;

	constructor(private chatService: ChatService) {}

	async handleConnection(socket: Socket) {
		try {
			await this.chatService.getUserFromSocket(socket);
		} catch (error) {
			socket.emit(ChatEvents.REFUSED, { data: { error: error.message } });
			socket.disconnect();
		}
	}

	handleDisconnect(socket: Socket) {
		socket.disconnect();
	}

	@SubscribeMessage(ChatEvents.EXIT_ROOM)
	listenForExitRoom(
		@MessageBody() { peerUserId, roomId }: RoomListenerParameters,
		@ConnectedSocket() socket: Socket
	) {
		socket.to(roomId).emit(ChatEvents.USER_DISCONNECTED_FROM_ROOM, peerUserId);
		socket.leave(roomId);
	}

	@SubscribeMessage(ChatEvents.JOIN_ROOM)
	async listenForJoinRoom(
		@MessageBody() { peerUserId, roomId }: RoomListenerParameters,
		@ConnectedSocket() socket: Socket
	) {
		socket.join(roomId);

		socket.to(roomId).emit(ChatEvents.USER_CONNECTED_TO_ROOM, peerUserId);

		socket.on('disconnect', () => {
			socket
				.to(roomId)
				.emit(ChatEvents.USER_DISCONNECTED_FROM_ROOM, peerUserId);
		});

		try {
			const user = await this.chatService.getUserFromSocket(socket);

			if (user) {
				const allMessages = await this.chatService.getAllMessages(roomId);
				socket.emit(ChatEvents.RECEIVE_ALL_MESSAGES, { data: allMessages });
			}
		} catch (error) {
			socket.emit(ChatEvents.REFUSED, { data: { error: error.message } });
			socket.disconnect();
		}
	}

	@SubscribeMessage(ChatEvents.SEND_MESSAGE)
	async listenForMessages(
		@MessageBody()
		{ message: newMessage, roomId }: NewMessageListenerParameters,
		@ConnectedSocket() socket: Socket
	) {
		const userFromSocket = await this.chatService.getUserFromSocket(socket);

		if (userFromSocket) {
			const { id, message, author } = await this.chatService.addMessage(
				newMessage,
				userFromSocket.username,
				roomId
			);
			this.websocketServer.emit(ChatEvents.RECEIVE_MESSAGE, {
				data: { id, author, message },
			});
		}

		throw new WsException("User doesn't exist");
	}
}
