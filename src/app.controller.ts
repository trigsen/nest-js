import { Controller, Body, Post, UseGuards } from '@nestjs/common';

import { AuthService } from './auth/auth.service';
import { AuthDto } from './auth/dto/auth.dto';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { Public } from './auth/guards/public.guard';

@Controller()
export class AppController {
	constructor(private authService: AuthService) {}

	@Public()
	@UseGuards(LocalAuthGuard)
	@Post('auth/login')
	async login(@Body() userDto: any) {
		console.log({ login: userDto });
		return this.authService.login(userDto);
	}

	// @ TODO move to auth.controller
	@Public()
	@Post('auth/register')
	async register(@Body() authDto: AuthDto) {
		console.log({ register: authDto });
		return this.authService.register(authDto);
	}
}
