

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
  socket.on('join', (userId) => {
    console.log('user join room',userId);
    socket.join(userId);

  })
  socket.on('send_request', (data) => {
    console.log('Received_request', data);
    socket.to(data.body.ownerId).emit('Received_request', data);
  });
socket.on('accepte_reject', (data) => {
  console.log('accepte_reject:', data);
  socket.to(data.user.id).emit('response_request', data);
});
socket.on('disconnect', () => {
  console.log('A user disconnected');
});
});






server.listen(4000, () => 'Server is running on port 4000');