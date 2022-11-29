import { Module } from '@nestjs/common';
import { ChatGateway } from './domain/chat.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import {
	MessageEntity,
	MessageSchema,
} from './infastructure/entities/message.entity';
import { UserEntity } from '../users/infastructure/entities/user.entity';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: MessageEntity.name, schema: MessageSchema },
			{ name: UserEntity.name, schema: UserEntity },
		]),
	],
	controllers: [],
	providers: [ChatGateway],
})
export class ChatModule {}
