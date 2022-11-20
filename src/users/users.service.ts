import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
	constructor(@InjectModel('User') private readonly user: Model<UserDto>) {}

	async create(username: string, password: string): Promise<UserDto> {
		const user = new this.user({ username, password });
		return user.save();
	}

	async findOne(username: string): Promise<UserDto | null> {
		return this.user
			.findOne((user: UserDto | null) => {
				return user?.username === username;
			})
			.clone();
	}
}
