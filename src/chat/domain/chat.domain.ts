import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';

import { AuthService } from '../../auth/auth.service';
import { UserJwtPayload } from '../../auth/interfaces/user-jwt-payload.interface';

@Injectable()
export class ChatService {
	constructor(
		private authService: AuthService,
		private jwtService: JwtService
	) {}

	async getUserFromSocket(socket: Socket) {
		if (socket.handshake.headers.authorization) {
			const [, token] = socket.handshake.headers.authorization.split(' ');

			// @ TODO move to .env
			const jwtPayload = this.jwtService.verify<UserJwtPayload>(token, {
				secret: 'secret',
			});

			return null;
			// return this.usersService.findOneById(id);
		}

		throw new WsException('Invalid credentials.');
	}
}
