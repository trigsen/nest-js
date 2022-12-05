import { UserEntity } from '../../../users/infastructure';
import { MessageEntity } from '../entities';

export interface ChatRepositoryInterface {
	addMessage: (message: string, author: UserEntity) => Promise<MessageEntity>;
	getAllMessages: () => Promise<MessageEntity[]>
}
