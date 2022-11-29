import { Injectable } from '@nestjs/common';

import { UsersDomain } from '../domain';

@Injectable()
export class UsersService {
	constructor(private readonly usersDomain: UsersDomain) {}

	getUser(id: string) {
		return this.usersDomain.findOneById(id);
	}
}
