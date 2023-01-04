import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CryptoService {
	async comparePasswords(plainPassword: string, encryptedPassword: string) {
		return bcrypt.compare(plainPassword, encryptedPassword);
	}

	async hashPassword(password: string) {
		const salt = await bcrypt.genSalt();
		return bcrypt.hash(password, salt);
	}

	async hashText(text: string) {
		return bcrypt.hash(text, 10)
	}
}
