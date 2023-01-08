const SOCKET_EVENTS = {
    SEND_MESSAGE: 'send_message',
    RECEIVE_MESSAGE: 'receive_message',
    RECEIVE_ALL_MESSAGES: 'receive_all_messages',
    REFUSED: 'refused',
    JOIN_ROOM: 'join_room',
    USER_CONNECTED_TO_ROOM: 'user-connected-to-room',
    USER_DISCONNECTED_FROM_ROOM: 'user_disconnected_from_room'
}

let socket;

const textInput = document.getElementById('textInput');
const messagesList = document.getElementById('messages');
const roomsList = document.getElementById('roomsList');
let currentRoom = ''

const handleSocketConnection = () => {
    const tokenInput = document.getElementById("token")
    console.log({ tokenInput: tokenInput, tokenValue: tokenInput.value })
    socket = io("http://localhost:3000", {
        extraHeaders: {
            Authorization: `Bearer ${tokenInput.value}`
        }
    })

    socket.on(SOCKET_EVENTS.RECEIVE_MESSAGE, ({ data }) => {
        console.log({ event: 'receive_message', data })

        handleNewMessage(data.author, data.message);
    })

    socket.on(SOCKET_EVENTS.RECEIVE_ALL_MESSAGES, ({ data }) => {
        console.log({ event: 'receive_all_messages', data })

        while (messagesList.firstChild) {
            messagesList.removeChild(messagesList.lastChild)
        }

        data.forEach(({ message, author}) => handleNewMessage(author, message))
    })

    socket.on(SOCKET_EVENTS.USER_CONNECTED_TO_ROOM, () => {
        console.log('USER_CONNECTED_TO_ROOM')
    })
}

const handleSubmitNewMessage = () => {
    socket?.emit(SOCKET_EVENTS.SEND_MESSAGE, { message: textInput.value, roomId: currentRoom })
}

const handleNewMessage = (author, message) => {
    messagesList.appendChild(createMessage(author, message));
}

const createMessage = (author, message) => {
    const li = document.createElement("li");
    li.appendChild(document.createTextNode(`${author}: ${message}`))
    return li;
}

const handleClickRoom = (roomId) => {
    currentRoom = roomId
    console.log({ roomId })
    socket?.emit(SOCKET_EVENTS.JOIN_ROOM, { roomId })
}

const handleClickGetRooms = async () => {
    const tokenInput = document.getElementById("token")
    const allRooms = await fetch('http://localhost:3000/chat/rooms', {
        method: 'get',
        headers: {
            Authorization: `Bearer ${tokenInput.value}`
        }
    })
    const data = await allRooms.json()

    data.rooms.forEach(room => {
        console.log({ room })
        const button = document.createElement('button')
        button.appendChild(document.createTextNode(room.roomName))
        button.onclick = () => {
            handleClickRoom(room.id)
        }
        roomsList.appendChild(button)
    })
}