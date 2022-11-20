import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { UsersModule } from './users/users.module';

// @ TODO add bcrypt for passwords
// @ TODO move necessary data to .env
// @ TODO add repository pattern*
// @ TODO add refresh token*
// @ TODO add docker
// @ TODO add redis

@Module({
	imports: [
		AuthModule,
		UsersModule,
		// @ TODO move to env pass and username
		MongooseModule.forRoot(
			'mongodb+srv://cluster0:cluster0Pass@cluster0.npduqgm.mongodb.net/nestjs-test?retryWrites=true&w=majority'
		),
	],
	controllers: [AppController],
	providers: [{ provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class AppModule {}
