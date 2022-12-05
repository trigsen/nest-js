import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UserEntity } from '../../../users/infastructure';
import { MessageDocument, MessageEntity } from '../entities';
import { ChatRepositoryInterface } from '../repository-interfaces';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatRepository implements ChatRepositoryInterface {
	constructor(
		@InjectModel(MessageEntity.name)
		private messageModel: Model<MessageDocument>
	) {}

	async addMessage(message: string, author: UserEntity): Promise<any> {
		return new this.messageModel({
			message,
			author,
		}).save();
	}
}
