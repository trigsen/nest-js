import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import {GuardsModule} from "../../../libs/core/src/guards.module";
import { UsersModule } from '../users/users.module';

import { CryptoModule } from '@app/crypto';

import { JwtStrategy, LocalStrategy, AuthService } from './application';
import { AuthDomain } from './domain';
import { AuthController } from './presentation';
import {JwtConfigurationService} from "../../config/jwt";

@Module({
	imports: [
		UsersModule,
		PassportModule,
		JwtModule.registerAsync({ useClass: JwtConfigurationService }),
		CryptoModule,
		GuardsModule,
	],
	providers: [AuthService, AuthDomain, LocalStrategy, JwtStrategy],
	exports: [AuthService, AuthDomain],
	controllers: [AuthController],
})
export class AuthModule {}
