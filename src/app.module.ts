import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { UsersModule } from './users/users.module';
import { UsersController } from './users/presentation';

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
			{
				connectionErrorFactory: (error) => {
					console.log(error);
					return error;
				},
			}
		),
		AuthModule,
		UsersModule,
	],
	controllers: [AppController],
	providers: [{ provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class AppModule {}
