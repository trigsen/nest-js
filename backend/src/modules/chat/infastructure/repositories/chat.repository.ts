import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { MessageDocument, MessageEntity } from '../entities';
import { RoomDocument, RoomEntity } from '../entities/room.entity';
import { ChatRepositoryInterface } from '../repository-interfaces';

// @ TODO split to two repositories - room and message
// @ TODO remove from response _v and _id properties
@Injectable()
export class ChatRepository implements ChatRepositoryInterface {
	constructor(
		@InjectModel(MessageEntity.name)
		private messageModel: Model<MessageDocument>,
		@InjectModel(RoomEntity.name) private roomModel: Model<RoomDocument>
	) {}

	async addMessageInRoom(message: string, author: string, roomId: string) {
		const newMessage = await new this.messageModel({
			message,
			author,
		}).save();

		await this.roomModel.findOneAndUpdate(
			{ id: roomId },
			{ $push: { messages: newMessage._id } },
			{ new: true, useFindAndModify: false }
		);

		return newMessage;
	}

	async createRoom(hostname: string, roomName: string) {
		const createdRoom = await new this.roomModel({
			host: hostname,
			roomName,
		}).save();

		return createdRoom.populate({
			path: 'messages',
			model: this.messageModel.modelName,
		});
	}

	async getAllMessagesInRoom(roomId: string) {
		// return this.messageModel.find().populate('author', undefined, this.userModel.modelName).lean().exec()

		const room = await this.roomModel
			.findOne({ id: roomId })
			.populate('messages', undefined, this.messageModel.modelName)
			.lean()
			.exec();

		if (!room) {
			return [];
		}

		return room.messages;
	}

	async getRooms() {
		return this.roomModel
			.find()
			.populate('messages', undefined, this.messageModel.modelName)
			.lean()
			.exec();
	}
}
