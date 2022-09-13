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

io.on('connection', (socket: any) => {
  socket.on('join-lobby', (roomId: any) => {
    socket.join(roomId);
  });

  socket.on('send-coding-pad-input', (data: any) => {
    io.to(data.roomId).emit('receive-coding-pad-input', data.codingPadInput);
  });

  socket.on('send-chat-message', (data: any) => {
    io.to(data.roomId).emit('receive-chat-message', data.message);
  });
});

httpServer.listen(8002);