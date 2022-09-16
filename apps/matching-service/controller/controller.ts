import { Socket, Server } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { findMatchingUserInQueue, addUserToQueue, removeUserFromQueue } from '../model/repository';

const respond = (
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
  socket: Socket
) => {
  // Client emits this event on clicking "Match" button.
  // If there is another user queueing for the same difficulty then they are matched and
  // the matched user is then removed from the QueueingUser table.
  // Otherwise adds the client to the QueueingUser table.
  socket.on('find-match', async (data) => {
    // TypeScript support for Sequelize damn painful
    const matchingUser: any = await findMatchingUserInQueue(data.difficulty, socket.id);
    if (matchingUser !== null) {
      const concatenatedIds = `${socket.id}%${matchingUser.socketId}`;
      io.to(matchingUser.socketId).emit('match-found', concatenatedIds);
      io.to(socket.id).emit('match-found', concatenatedIds);

      // Only the user that was found is in DB
      matchingUser.destroy();
    } else {
      addUserToQueue(data.difficulty, socket.id);
    }
  });

  // Delete the queueing user
  socket.on('cancel-match', async () => {
    removeUserFromQueue(socket.id);
  });

  // Delete the queueing user if no match found and emit a new event for frontend to handle
  socket.on('no-match-found', async () => {
    removeUserFromQueue(socket.id);
    io.to(socket.id).emit('server-no-match-found');
  });
};

export default respond;
