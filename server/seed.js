

const express = require('express');
const app = express();
http = require('http');
const cors = require('cors');
const { Server } = require('socket.io'); 

 

const server = http.createServer(app); 


const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  console.log('a user connected',socket.id);
  socket.join('admin');
  socket.on('send_hotel', (data) => {
   
    console.log('Received_notification', data);
    socket.to('admin').emit('Received_hotel', data);
  });
socket.on('accepte_reject', (data) => {
  console.log('accepte_reject:', data);
  socket.to().emit('response_notification', data);
});
socket.on('disconnect', () => {
  console.log('A user disconnected');
});
});



server.listen(4000, () => 'Server is running on port 4000');