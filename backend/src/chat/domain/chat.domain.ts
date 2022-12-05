import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';

import { UsersDomain } from '../../users/domain';

@Injectable()
export class ChatDomain {
	constructor(
		private jwtService: JwtService,
		private usersDomain: UsersDomain
	) {}

	async getUserFromSocket(socket: Socket) {
		if (socket.handshake.headers.authorization) {
			const [, token] = socket.handshake.headers.authorization.split(' ');

			// @ TODO move to .env
			const jwtPayload = this.jwtService.verify<{ sub?: string }>(token, {
				secret: 'secret',
			});

			if (jwtPayload.sub) {
				return this.usersDomain.getUserById(jwtPayload.sub);
			}
		}

		throw new WsException('Invalid credentials.');
	}
}
