import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Type} from "class-transformer";
import * as mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';
import { v4 as uuidV4 } from 'uuid';

import {AuthorEntity} from "./author.entity";

export type MessageDocument = HydratedDocument<MessageEntity>;

@Schema()
export class MessageEntity {
	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: AuthorEntity.name, refPath: 'id' })
	@Type(() => AuthorEntity)
	author: AuthorEntity;

	@Prop({ default: () => uuidV4() })
	id: string;

	@Prop()
	message: string;
}

export const MessageSchema = SchemaFactory.createForClass(MessageEntity);
