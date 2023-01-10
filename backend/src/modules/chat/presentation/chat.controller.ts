import { Controller, Get, Post, Req, Body } from '@nestjs/common';
import { Request } from 'express';

import { ChatService } from '../application';

import { CreateRoomDto } from './dtos';

@Controller('chat')
export class ChatController {
	constructor(private chatService: ChatService) {}

	@Post('/room')
	async createRoom(
		@Req() request: Request,
		@Body() createRoomDto: CreateRoomDto
	) {
		const { id, host, messages, roomName } = await this.chatService.createRoom(
			request.user.id,
			createRoomDto.roomName
		);

		return {
			id,
			host,
			roomName,
			messages,
		};
	}

	@Get('/rooms')
	async getRooms() {
		const rooms = await this.chatService.getRooms();

		return {
			rooms,
		};
	}
}
