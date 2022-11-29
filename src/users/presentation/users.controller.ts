import { Controller, Get, HttpException, Req } from '@nestjs/common';
import { Request } from 'express';

import { UsersService } from '../application';

@Controller('users')
export class UsersController {
	constructor(private usersService: UsersService) {}

	@Get('profile')
	async getProfile(@Req() request: Request) {
		const user = await this.usersService.getUser(request.user.id);

		if (!user) {
			throw new HttpException("User doesn't exist", 500);
		}

		return {
			id: user.id,
			username: user.username,
		};
	}
}
