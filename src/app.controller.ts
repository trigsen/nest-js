import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common';

import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { Public } from './auth/guards/public.guard';

@Controller()
export class AppController {
	constructor(private authService: AuthService) {}

	@Get('profile')
	async getProfile(@Request() request: any) {
		return request.user;
	}

	@Public()
	@UseGuards(LocalAuthGuard)
	@Post('auth/login')
	async login(@Request() request: any) {
		return this.authService.login(request.user);
	}
}
