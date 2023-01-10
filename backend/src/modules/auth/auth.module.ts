import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import {
	JwtConfigurationService,
	JwtRefreshConfigurationService,
} from '../../config/jwt';
import { UsersModule } from '../users/users.module';

import { CryptoModule } from '@app/crypto';

import {
	AccessJwtStrategy,
	LocalStrategy,
	AuthService,
	RefreshAuthGuard,
	RefreshTokenStrategy,
} from './application';
import { AuthDomain } from './domain';
import { AuthController } from './presentation';

@Module({
	imports: [
		UsersModule,
		PassportModule,
		JwtModule.registerAsync({ useClass: JwtConfigurationService }),
		JwtModule.registerAsync({ useClass: JwtRefreshConfigurationService }),
		CryptoModule,
	],
	providers: [
		AuthService,
		AuthDomain,
		LocalStrategy,
		AccessJwtStrategy,
		RefreshTokenStrategy,
		RefreshAuthGuard,
	],
	exports: [AuthService, AuthDomain],
	controllers: [AuthController],
})
export class AuthModule {}
