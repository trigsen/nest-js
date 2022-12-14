import {
	Get,
	Body,
	Controller,
	Post,
	UseGuards,
	Req,
	InternalServerErrorException,
} from '@nestjs/common';
import { Request } from 'express';

import {
	AuthService,
	RefreshAuthGuard,
	LocalAuthGuard,
	Public,
} from '../application';

import { LoginUserDto, RegisterUserDto } from './dtos';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@UseGuards(LocalAuthGuard)
	@Public()
	@Post('login')
	async login(@Req() request: Request, @Body() loginUserDto: LoginUserDto) {
		if (!request.res) {
			throw new InternalServerErrorException();
		}

		const { accessToken, cookie } = await this.authService.login(loginUserDto);

		request.res.setHeader('Set-Cookie', cookie);

		return { access_token: accessToken };
	}

	@UseGuards(RefreshAuthGuard)
	@Public()
	@Get('refresh')
	async refreshAccessToken(@Req() request: Request) {
		const accessToken = await this.authService.refreshAccessToken(
			request.user.id,
			request.user.username,
			request.cookies.Refresh
		);

		return { access_token: accessToken };
	}

	@Public()
	@Post('register')
	async register(
		@Req() request: Request,
		@Body() registerUserDto: RegisterUserDto
	) {
		if (!request.res) {
			throw new InternalServerErrorException();
		}

		const { accessToken, cookie } = await this.authService.register(
			registerUserDto
		);

		request.res.setHeader('Set-Cookie', cookie);

		return { access_token: accessToken };
	}
}
