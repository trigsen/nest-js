import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';
import { v4 as uuidV4 } from 'uuid';

import { UserEntity } from '../../../users/infastructure';

export type MessageDocument = HydratedDocument<MessageEntity>;

@Schema()
export class MessageEntity {
	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: UserEntity.name })
	author: UserEntity;

	@Prop({ default: () => uuidV4() })
	id: string;

	@Prop()
	message: string;
}

export const MessageSchema = SchemaFactory.createForClass(MessageEntity);
