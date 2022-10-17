var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try {
            step(generator.next(value));
        }
        catch (e) {
            reject(e);
        } }
        function rejected(value) { try {
            step(generator["throw"](value));
        }
        catch (e) {
            reject(e);
        } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { findMatchingUserInQueue, addUserToQueue, removeUserFromQueue } from '../model/repository';
const respond = (io, socket) => {
    // Client emits this event on clicking "Match" button.
    // If there is another user queueing for the same difficulty then they are matched and
    // the matched user is then removed from the QueueingUser table.
    // Otherwise adds the client to the QueueingUser table.
    socket.on('find-match', (data) => __awaiter(void 0, void 0, void 0, function* () {
        // TypeScript support for Sequelize damn painful
        const matchingUser = yield findMatchingUserInQueue(data.difficulty, socket.id);
        if (matchingUser !== null) {
            const concatenatedIds = `${socket.id}%${matchingUser.socketId}`;
            io.to(matchingUser.socketId).emit('match-found', concatenatedIds);
            io.to(socket.id).emit('match-found', concatenatedIds);
            // Only the user that was found is in DB
            matchingUser.destroy();
        }
        else {
            addUserToQueue(data.difficulty, socket.id);
        }
    }));
    // Delete the queueing user
    socket.on('cancel-match', () => __awaiter(void 0, void 0, void 0, function* () {
        removeUserFromQueue(socket.id);
    }));
    // Delete the queueing user if no match found and emit a new event for frontend to handle
    socket.on('no-match-found', () => __awaiter(void 0, void 0, void 0, function* () {
        removeUserFromQueue(socket.id);
        io.to(socket.id).emit('server-no-match-found');
    }));
};
export default respond;
