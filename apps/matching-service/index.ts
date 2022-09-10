import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { Sequelize, DataTypes, Op } from 'sequelize';

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

const sequelize = new Sequelize('sqlite::memory:');

const QueueingUser = sequelize.define('QueueingUser', {
  socketId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  difficulty: {
    type: DataTypes.ENUM('easy', 'medium', 'hard'),
    allowNull: false
  }
});
QueueingUser.sync();

const MatchingPair = sequelize.define('MatchingPair', {
  socketId1: {
    type: DataTypes.STRING,
    allowNull: false
  },
  socketId2: {
    type: DataTypes.STRING,
    allowNull: false
  },
  difficulty: {
    type: DataTypes.ENUM('easy', 'medium', 'hard'),
    allowNull: false
  }
});
MatchingPair.sync();

io.on('connection', (socket) => {
  // Client emits this event on clicking "Match" button.
  // If there is another user queueing for the same difficulty then they are matched and added to
  // MatchingPair table. The matched user is then removed from the QueueingUser table.
  // Otherwise adds the client to the QueueingUser table.
  socket.on('find-match', async (data) => {
    // TypeScript support for Sequelize isn't very good yet
    const matchedUser: any = await QueueingUser.findOne({
      where: { difficulty: data.difficulty, [Op.not]: { socketId: socket.id } }
    });
    if (matchedUser !== null) {
      io.to(matchedUser.socketId).emit('match-found', socket.id);
      io.to(socket.id).emit('match-found', matchedUser.socketId);

      MatchingPair.create({
        socketId1: socket.id,
        socketId2: matchedUser.socketId,
        difficulty: data.difficulty
      });

      // Only the matched user is in DB
      matchedUser.destroy();
    } else {
      QueueingUser.create({ socketId: socket.id, difficulty: data.difficulty });
    }
  });

  // Delete the queueing user
  socket.on('cancel-match', async () => {
    QueueingUser.destroy({ where: { socketId: socket.id } });
  });

  // Delete the queueing user if no match found and emit a new event for frontend to handle
  socket.on('no-match-found', async () => {
    QueueingUser.destroy({ where: { socketId: socket.id } });
    io.to(socket.id).emit('server-no-match-found');
  });
});

httpServer.listen(8001);
