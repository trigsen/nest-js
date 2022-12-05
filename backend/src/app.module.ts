import { Module } from '@nestjs/common';
import { APP_GUARD } from "@nestjs/core";
import { MongooseModule } from '@nestjs/mongoose';


import { GuardsModule } from "../libs/core/src/guards.module";

import { JwtAuthGuard } from "@app/core";

import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';
import { UsersModule } from './users/users.module';

// @ TODO add docker
// @ TODO move necessary data to .env
// @ TODO add repository pattern*
// @ TODO add refresh token*
// @ TODO add redis

@Module({
	imports: [
		// @ TODO move to env pass and username
		MongooseModule.forRoot(
			'mongodb+srv://cluster0:cluster0Pass@cluster0.npduqgm.mongodb.net/nestjs-test',
		),
		AuthModule,
		UsersModule,
		ChatModule,
		GuardsModule,
	],
	providers: [{ provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class AppModule {}
