import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CryptoService {
	async comparePasswords(plainPassword: string, encryptedPassword: string) {
		return bcrypt.compare(plainPassword, encryptedPassword);
	}

	async encodePassword(password: string) {
		const salt = bcrypt.genSaltSync();
		return bcrypt.hash(password, salt);
	}
}