import { UserEntity } from '../../../users/infastructure/entities/user.entity';
import { MessageEntity } from '../entities/message.entity';

export interface ChatRepositoryInterface {
	addMessage(message: string, author: UserEntity): Promise<MessageEntity>;
}
