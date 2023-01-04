import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {UserToUpdate} from "../../core/interfaces";
import { UserDocument, UserEntity } from '../entities';
import { UsersRepositoryInterface } from '../repository-interfaces';

@Injectable()
export class UsersRepository implements UsersRepositoryInterface {
	constructor(
		@InjectModel(UserEntity.name)
		private readonly userModel: Model<UserDocument>
	) {}

	async addUser(username: string, password: string) {
		const user = new this.userModel({ username, password });
		return user.save();
	}

	async findUserById(id: string) {
		return this.userModel
			.findOne({ id })
			.lean()
			.clone();
	}

	async findUserByUsername(username: string) {
		return this.userModel
			.findOne({ username })
			.lean()
			.exec();
	}

	async updateUser(id: string, updatedUser: UserToUpdate) {
		return this.userModel.findOneAndUpdate({
			id
		}, {
			...updatedUser
		}, {
			upsert: true,
			new: true
		}).lean().exec()
	}
}
