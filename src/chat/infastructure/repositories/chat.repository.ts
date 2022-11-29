import { ChatRepositoryInterface } from '../repository-interfaces/chat.repository-interface';
import { UserEntity } from '../../../users/infastructure/entities/user.entity';
import { MessageDocument, MessageEntity } from '../entities/message.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

export class ChatRepository implements ChatRepositoryInterface {
	constructor(
		@InjectModel(MessageEntity.name)
		private messageModel: Model<MessageDocument>
	) {}

	async addMessage(message: string, author: UserEntity): Promise<any> {}
}
