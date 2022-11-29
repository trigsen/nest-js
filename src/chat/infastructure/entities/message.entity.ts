import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';

import { UserEntity } from '../../../users/infastructure/entities/user.entity';

export type MessageDocument = HydratedDocument<MessageEntity>;

@Schema()
export class MessageEntity {
	@Prop({ required: true })
	id: string;

	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: UserEntity.name })
	author: UserEntity;

	@Prop()
	message: string;
}

export const MessageSchema = SchemaFactory.createForClass(MessageEntity);
