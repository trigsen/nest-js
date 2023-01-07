import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { MongooseModule } from '@nestjs/mongoose';


import {configuration, MongoConfigurationService, validate} from "./config";
import {JwtAuthGuard} from "./modules/auth/application";
import { AuthModule } from './modules/auth/auth.module';
import { ChatModule } from './modules/chat/chat.module';
import { UsersModule } from './modules/users/users.module';

// @ TODO add refresh token*
// @ TODO add redis

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true, load: configuration, validate }),
		MongooseModule.forRootAsync({ useClass: MongoConfigurationService }),
		AuthModule,
		UsersModule,
		ChatModule,
	],
	providers: [{ provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class AppModule {}
