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

const matchingPool: { easy: string[]; medium: string[]; hard: string[] } = {
  easy: [],
  medium: [],
  hard: []
};
const matchingPairs: [string, string][] = [];

io.on('connection', (socket) => {
  // Client emits this event on clicking "Match" button. Matches the client with a user queueing
  // for the same difficulty, or adds the client to the queue if it is empty
  socket.on('select-difficulty', (data: { difficulty: 'easy' | 'medium' | 'hard' }) => {
    const queue = matchingPool[data.difficulty];
    if (queue.length > 0) {
      const matchedId = queue.shift()!;
      matchingPairs.push([socket.id, matchedId]);
      // Emit event to the matching pairs
      io.to(matchedId).emit('match-found', socket.id);
      io.to(socket.id).emit('match-found', matchedId);
    } else {
      queue.push(socket.id);
    }

    console.log(`matching pool:  ${JSON.stringify(matchingPool)}`);
    console.log(`matching pairs:  ${matchingPairs}`);
  });
});

httpServer.listen(8001);
