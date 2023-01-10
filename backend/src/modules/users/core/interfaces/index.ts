import { UserEntity } from '../../infastructure';

export type UserToUpdate = Partial<Omit<UserEntity, 'id'>>;
