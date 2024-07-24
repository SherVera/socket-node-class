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

const socketsOnline = []

io.on('connection', socket => {
    socketsOnline.push(socket.id)
    io.emit('welcome', 'Welcome to the server')

    socket.on('server', data => {
        console.log(data)
    })

    io.emit('everyone', socket.id + ' Connected')

    socket.on('last', message => {
        const lastSocket = socketsOnline[socketsOnline.length - 1]

        io.to(lastSocket).emit('hello', message)
    })

    // on, once and off

    // Listen to an event wherever it is emitted
    // socket.on('on', () => {
    //     console.log('Listening to event')
    // })

    socket.emit('on', 'Listening to event')
    socket.emit('on', 'Listening to event')

    // Listen to an event only once
    socket.emit('once', 'Listening to event once')
    socket.emit('once', 'Listening to event once')

    socket.emit('off', 'Listening to event off')

    setTimeout(() => {
        socket.emit('off', 'Listening to event off')
    }, 3000)
    
})

httpServer.listen(3000)