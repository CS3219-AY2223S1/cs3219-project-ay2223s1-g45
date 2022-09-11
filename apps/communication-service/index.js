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
  socket.on('join-chat-room', (chatRoomId) => {
    socket.join(chatRoomId);
  });

  socket.on('send-chat-message', (data) => {
    io.to(data.chatRoomId).emit('receive-chat-message', data.message);
  });
});

httpServer.listen(8002);
