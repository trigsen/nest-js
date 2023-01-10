export const enum ChatEvents {
	SEND_MESSAGE = 'send_message',
	RECEIVE_MESSAGE = 'receive_message',
	RECEIVE_ALL_MESSAGES = 'receive_all_messages',
	REFUSED = 'refused',
	JOIN_ROOM = 'join_room',
	EXIT_ROOM = 'exit_room',
	USER_CONNECTED_TO_ROOM = 'user-connected-to-room',
	USER_DISCONNECTED_FROM_ROOM = 'user_disconnected_from_room',
}
