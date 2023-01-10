import { MessageEntity } from '../entities';
import { RoomEntity } from '../entities/room.entity';

export interface ChatRepositoryInterface {
	addMessageInRoom: (
		message: string,
		author: string,
		roomId: string
	) => Promise<MessageEntity>;
	createRoom: (hostname: string, roomName: string) => Promise<RoomEntity>;
	getAllMessagesInRoom: (roomId: string) => Promise<MessageEntity[]>;
	getRooms: () => Promise<RoomEntity[]>;
}
