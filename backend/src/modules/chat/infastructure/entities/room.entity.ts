import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import mongoose, { HydratedDocument } from 'mongoose';
import { v4 as uuidV4 } from 'uuid';

import { MessageEntity } from './message.entity';

export type RoomDocument = HydratedDocument<RoomEntity>;

@Schema()
export class RoomEntity {
	@Prop({ required: true })
	host: string;

	@Prop({ default: () => uuidV4() })
	id: string;

	@Prop([
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: MessageEntity.name,
			refPath: 'id',
		},
	])
	messages: MessageEntity[];

	@Prop({ required: true })
	roomName: string;
}

export const RoomSchema = SchemaFactory.createForClass(RoomEntity);
