import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {CryptoModule} from "@app/crypto";

import { UsersService } from './application';
import { USERS_REPOSITORY_TOKEN } from './core/tokens';
import { UsersDomain } from './domain';
import { UserEntity, UserSchema, UsersRepository } from './infastructure';
import { UsersController } from './presentation';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: UserEntity.name, schema: UserSchema }]),
		CryptoModule,
	],
	controllers: [UsersController],
	providers: [
		{ provide: USERS_REPOSITORY_TOKEN, useClass: UsersRepository },
		UsersDomain,
		UsersService,
	],
	exports: [UsersDomain, UsersService],
})
export class UsersModule {}
