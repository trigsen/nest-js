import { Module } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { UsersModule } from '../users/users.module';

import { CryptoModule } from '@app/crypto';

import { JwtStrategy, LocalStrategy, AuthService } from './application';
import { AuthDomain } from './domain';
import { AuthController } from './presentation';

@Module({
	imports: [
		UsersModule,
		PassportModule,
		JwtModule.register({
			secret: 'secret',
			signOptions: { expiresIn: '10000s' },
		}),
		Reflector,
		CryptoModule,
	],
	providers: [AuthService, AuthDomain, LocalStrategy, JwtStrategy],
	exports: [AuthService],
	controllers: [AuthController],
})
export class AuthModule {}
