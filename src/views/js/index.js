const socket = io()

function checkSocketStatus() {
    console.log('Estado del Socket: ', socket.connected)
}
socket.on('connect', () => {
    console.log('El socket se ha conectado', socket.id)
    checkSocketStatus()
})

socket.on('connect_error', () => {
    console.log('No pude conectarme')
})

socket.on('disconnect', () => {
    console.log('El socket se ha desconectado', socket.id)
    checkSocketStatus()
})

socket.io.on('reconnect_attempt', () => {
    console.log('Se esta intentando reconectar')
})

socket.io.on('reconnect', () => {
    console.log('Se ha reconectado')
})

socket.on('welcome', data => {
    const text = document.querySelector('#text')
    text.textContent = data
})

socket.on('everyone', data => {
    console.log(data)
})

const emitToLast = document.querySelector('#emit-to-last')

emitToLast.addEventListener('click', () => {
    socket.emit('last', 'Hola, soy el último')
})

socket.on('hello', data => {
    console.log(data)
})

socket.on('on', () => {
    console.log('Listening to event')
})

socket.once('once', () => {
    console.log('Listening to event once')
})

// method off
const listener = () => {
    console.log('Off the event')
}

socket.on('off', listener)

setTimeout(() => { 
    socket.off('off', listener)
}, 2000)