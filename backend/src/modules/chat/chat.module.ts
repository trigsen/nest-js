import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from '../auth/auth.module';
import { UserEntity, UserSchema } from '../users/infastructure';
import { UsersModule } from '../users/users.module';

import { ChatService } from './application';
import { CHAT_REPOSITORY_TOKEN } from './core/tokens/chat-repository.token';
import { ChatDomain } from './domain/chat.domain';
import {
	MessageEntity,
	MessageSchema,
	ChatRepository,
	RoomEntity,
	RoomSchema,
} from './infastructure';
import { ChatGateway } from './presentation';
import { ChatController } from './presentation/chat.controller';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: MessageEntity.name, schema: MessageSchema },
			{ name: RoomEntity.name, schema: RoomSchema },
			{ name: UserEntity.name, schema: UserSchema },
		]),
		UsersModule,
		AuthModule,
	],
	controllers: [ChatController],
	providers: [
		ChatGateway,
		{ provide: CHAT_REPOSITORY_TOKEN, useClass: ChatRepository },
		ChatDomain,
		ChatService,
	],
	exports: [ChatDomain, ChatService],
})
export class ChatModule {}
