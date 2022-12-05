import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {HydratedDocument} from "mongoose";
import {v4 as uuidV4} from "uuid";

export type AuthorDocument = HydratedDocument<AuthorEntity>

@Schema()
export class AuthorEntity {
    @Prop({ default: () => uuidV4() })
    id: string;

    @Prop({ required: true })
    username: string
}

export const AuthorSchema = SchemaFactory.createForClass(AuthorEntity)