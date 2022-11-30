import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthDomain {
	constructor(private jwtService: JwtService) {}

	async generateAccessToken(username: string, id: string) {
		return this.jwtService.signAsync({
			username,
			sub: id,
		});
	}
}
