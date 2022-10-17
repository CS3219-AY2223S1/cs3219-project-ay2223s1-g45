import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello world');
});
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*'
  }
});
io.on('connection', (socket) => {
  socket.on('join-lobby', (roomId) => {
    socket.join(roomId);
  });
  socket.on('send-coding-pad-input', (data) => {
    io.to(data.roomId).emit('receive-coding-pad-input', data.codingPadInput);
  });
  socket.on('send-chat-message', (data) => {
    io.to(data.roomId).emit('receive-chat-message', data.message);
  });
});
httpServer.listen(8002);
