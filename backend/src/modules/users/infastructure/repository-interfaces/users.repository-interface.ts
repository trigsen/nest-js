import { UserToUpdate } from '../../core/interfaces';
import { UserEntity } from '../entities';

export interface UsersRepositoryInterface {
	addUser: (username: string, password: string) => Promise<UserEntity>;
	findUserById: (id: string) => Promise<UserEntity | null>;
	findUserByUsername: (username: string) => Promise<UserEntity | null>;
	updateUser: (id: string, updatedFields: UserToUpdate) => Promise<UserEntity>;
}
