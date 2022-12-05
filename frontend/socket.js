let socket;

const textInput = document.getElementById('textInput');
const messagesList = document.getElementById('messages');

const handleSocketConnection = () => {
    const tokenInput = document.getElementById("token")
    console.log({ tokenInput: tokenInput, tokenValue: tokenInput.value })
    socket = io("http://localhost:3000", {
        extraHeaders: {
            Authorization: `Bearer ${tokenInput.value}`
        }
    })

    socket.on('receive_message', ({ data }) => {
        console.log({ event: 'receive_message', data })
        handleNewMessage(data);
    })

    socket.on('receive_all_messages', ({ data }) => {
        console.log({ event: 'receive_all_messages', data })
        data.forEach(handleNewMessage)
    })
}

const handleSubmitNewMessage = () => {
    console.log('emit', socket)
    socket?.emit('send_message', textInput.value)
}

const handleNewMessage = (data) => {
    messagesList.appendChild(createMessage(data));
}

const createMessage = (data) => {
    const li = document.createElement("li");
    li.appendChild(document.createTextNode(`${data.author.username}: ${data.message}`))
    return li;
}