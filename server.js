'use strict';
const http = require('http');
const express = require('express');
const socketIo = require('socket.io')

const app = express();

app.set('view engine', 'jade');

app.use(express.static('./public'));


app.get('/', (req, res)=>{
    res.end('Express connected')
});

app.get('/home', (req, res) =>{
    res.render('index', {title: 'My web'})
});

const server = http.Server(app);
const io = socketIo(server);
io.on('connection', socket =>{
    console.log('Client connected');

    socket.on('chat:add', data =>{
        console.log(data);
        io.emit('chat:added', data);
    });
});
const port = 3000;
server.listen(port, ()=>{
    console.log(`Server is listening on port ${port}`);
})