import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { LocalAuthGuard, Public } from '../../../../libs/core/src/guards';
import { AuthService } from '../application';

import { LoginUserDto, RegisterUserDto } from './dtos';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@UseGuards(LocalAuthGuard)
	@Public()
	@Post('login')
	async login(@Body() loginUserDto: LoginUserDto) {
		return this.authService.login(loginUserDto);
	}

	@Public()
	@Post('register')
	async register(@Body() registerUserDto: RegisterUserDto) {
		return this.authService.register(registerUserDto);
	}
}
