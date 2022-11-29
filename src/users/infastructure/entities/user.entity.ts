import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { v4 as uuidV4 } from 'uuid';

export type UserDocument = HydratedDocument<UserEntity>;

@Schema()
export class UserEntity {
	@Prop({ default: () => uuidV4() })
	id: string;

	@Prop({ required: true })
	password: string;

	@Prop({ required: true })
	username: string;
}

export const UserSchema = SchemaFactory.createForClass(UserEntity);
