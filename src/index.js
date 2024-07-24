const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();

const httpServer = createServer(app)

const io = new Server(httpServer)

app.use(express.static(path.join(__dirname, 'views')))
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
})


io.on('connection', socket => {
    socket.emit('welcome', 'Bienvenido al servidor')
    socket.on('server', data => {
        console.log(data)
    })

    // Broadcast
    io.emit('everyone', socket.id + ' se ha conectado')
})

httpServer.listen(3000)