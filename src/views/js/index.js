
const socket = io()

function checkSocketStatus() {
    console.log('Estado del Socket: ', socket.connected)
}
socket.on('welcome', (data) => {
    console.log('message', data)

    // hmtl element id 
    text.textContent = data
    checkSocketStatus()
})

const emitToServer = document.querySelector('#emit-to-server')

emitToServer.addEventListener('click', () => {
    socket.emit('server', "Hello server")
})
socket.on('everyone', (data) => {
    console.log(data)
    checkSocketStatus()
})