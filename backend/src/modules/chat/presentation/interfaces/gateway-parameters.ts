export interface RoomListenerParameters {
	peerUserId: string;
	roomId: string;
}

export interface NewMessageListenerParameters {
	message: string;
	roomId: string;
}
