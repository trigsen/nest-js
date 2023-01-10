const SOCKET_EVENTS = {
    SEND_MESSAGE: 'send_message',
    RECEIVE_MESSAGE: 'receive_message',
    RECEIVE_ALL_MESSAGES: 'receive_all_messages',
    REFUSED: 'refused',
    JOIN_ROOM: 'join_room',
    EXIT_ROOM: 'exit_room',
    USER_CONNECTED_TO_ROOM: 'user-connected-to-room',
    USER_DISCONNECTED_FROM_ROOM: 'user_disconnected_from_room'
}

let socket;
const myPeer = new Peer()
let currentPeerUserId = ''
let mediaStream;

myPeer.on('open', (peerUserId) => {
    currentPeerUserId = peerUserId
})

myPeer.on('call', call => {
    call.answer(mediaStream)
    const video = document.createElement('video')
    call.on('stream', userVideoStream => {
        addVideoStream(video, userVideoStream)
    })

    call.on('close', () => {
        video.remove()
    })
    peers[call.peer] = call
})

const textInput = document.getElementById('textInput');
const messagesList = document.getElementById('messages');
const roomsList = document.getElementById('roomsList');
const videoGrid = document.getElementById('video-grid');

let currentRoom = ''

const myVideo = document.createElement('video')
myVideo.muted = true
const peers = {}

const handleSocketConnection = async () => {
    const tokenInput = document.getElementById("token")
    socket = io("http://localhost:3000", {
        extraHeaders: {
            Authorization: `Bearer ${tokenInput.value}`
        }
    })

    socket.on(SOCKET_EVENTS.RECEIVE_MESSAGE, ({ data }) => {
        handleNewMessage(data.author, data.message);
    })

    socket.on(SOCKET_EVENTS.RECEIVE_ALL_MESSAGES, ({ data }) => {
        while (messagesList.firstChild) {
            messagesList.removeChild(messagesList.lastChild)
        }

        data.forEach(({ message, author}) => handleNewMessage(author, message))
    })

    socket.on(SOCKET_EVENTS.USER_DISCONNECTED_FROM_ROOM, (peerUserId) => {
        if (peers[peerUserId]) {
            peers[peerUserId].close()
        }
    })

    socket.on(SOCKET_EVENTS.USER_CONNECTED_TO_ROOM, (peerUserId) => {
        connectToNewUser(peerUserId, mediaStream)
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

const handleClickRoom = async (roomId) => {
    if (!mediaStream) {
        mediaStream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        })
    }

    if (currentRoom && currentPeerUserId) {
        socket.emit(SOCKET_EVENTS.EXIT_ROOM, { peerUserId: currentPeerUserId, roomId: currentRoom })
        Object.values(peers).forEach(call => call.close())
    }

    socket.emit(SOCKET_EVENTS.JOIN_ROOM, { peerUserId: currentPeerUserId, roomId })

    currentRoom = roomId

    addVideoStream(myVideo, mediaStream)
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
        const button = document.createElement('button')
        button.appendChild(document.createTextNode(room.roomName))
        button.onclick = () => {
            handleClickRoom(room.id)
        }
        roomsList.appendChild(button)
    })
}

function connectToNewUser(peerUserId, stream) {
    const call = myPeer.call(peerUserId, stream)
    const video = document.createElement('video')

    call.on('stream', userVideoStream => {
        addVideoStream(video, userVideoStream)
    })
    call.on('close', () => {
        video.remove()
    })

    peers[peerUserId] = call
}

function addVideoStream(video, stream) {
    video.srcObject = stream
    video.addEventListener('loadedmetadata', () => {
        video.play()
    })
    videoGrid.append(video)
}