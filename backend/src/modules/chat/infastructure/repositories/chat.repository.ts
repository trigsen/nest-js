import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {Document, Model} from 'mongoose';

import { UserEntity } from '../../../users/infastructure';
import { MessageDocument, MessageEntity } from '../entities';
import {AuthorDocument, AuthorEntity} from "../entities/author.entity";
import { ChatRepositoryInterface } from '../repository-interfaces';

@Injectable()
export class ChatRepository implements ChatRepositoryInterface {
	constructor(
		@InjectModel(MessageEntity.name)
		private messageModel: Model<MessageDocument>,
		@InjectModel(AuthorEntity.name) private authorModel: Model<AuthorDocument>
	) {}

	async addMessage(message: string, author: AuthorEntity) {
		const createdMessage = await new this.messageModel({
			message,
			author,
		}).save();

		return createdMessage.populate({ path: 'author', model: this.authorModel.modelName })
	}

	async getAllMessages() {
		return this.messageModel.find().populate('author', undefined, this.authorModel.modelName).lean().exec()
	}
}
