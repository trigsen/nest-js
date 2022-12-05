import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {AuthModule} from "../auth/auth.module";
import { UsersModule } from '../users/users.module';

import { ChatService } from './application';
import {AUTHOR_REPOSITORY_TOKEN} from "./core/tokens/author-repository.token";
import { CHAT_REPOSITORY_TOKEN } from './core/tokens/chat-repository.token';
import { ChatDomain } from './domain/chat.domain';
import { MessageEntity, MessageSchema, ChatRepository } from './infastructure';
import {AuthorEntity, AuthorSchema} from "./infastructure/entities/author.entity";
import { AuthorRepository } from "./infastructure/repositories/author.repository";
import { ChatGateway } from './presentation';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: MessageEntity.name, schema: MessageSchema },
			{ name: AuthorEntity.name, schema: AuthorSchema },
		]),
		UsersModule,
		AuthModule,
	],
	controllers: [],
	providers: [
		ChatGateway,
		{ provide: AUTHOR_REPOSITORY_TOKEN, useClass: AuthorRepository },
		{ provide: CHAT_REPOSITORY_TOKEN, useClass: ChatRepository },
		ChatDomain,
		ChatService,
	],
	exports: [ChatDomain, ChatService],
})
export class ChatModule {}
