import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { v4 as uuidV4 } from 'uuid';

export type MessageDocument = HydratedDocument<MessageEntity>;

@Schema()
export class MessageEntity {
	@Prop({ required: true })
	author: string;

	@Prop({ default: () => uuidV4() })
	id: string;

	@Prop()
	message: string;

	@Prop({ required: true })
	roomId: string
}

export const MessageSchema = SchemaFactory.createForClass(MessageEntity);
