import { JwtAuthGuard } from '@app/core';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './auth/auth.module';
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
	providers: [{ provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class AppModule {}
