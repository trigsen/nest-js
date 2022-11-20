import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
	password: { type: String, required: true },
	username: { type: String, required: true },
});
