import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';

import { UserEntity, UserSchema } from '../users/infastructure';
import { UsersModule } from '../users/users.module';

import { ChatService } from './application';
import { CHAT_REPOSITORY_TOKEN } from './core/tokens/chat-repository.token';
import { ChatDomain } from './domain/chat.domain';
import { MessageEntity, MessageSchema, ChatRepository } from './infastructure';
import { ChatGateway } from './presentation';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: MessageEntity.name, schema: MessageSchema },
			{ name: UserEntity.name, schema: UserSchema },
		]),
		UsersModule,
		JwtModule,
	],
	controllers: [],
	providers: [
		ChatGateway,
		{ provide: CHAT_REPOSITORY_TOKEN, useClass: ChatRepository },
		ChatDomain,
		ChatService,
	],
	exports: [ChatDomain, ChatService],
})
export class ChatModule {}
