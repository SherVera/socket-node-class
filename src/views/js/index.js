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