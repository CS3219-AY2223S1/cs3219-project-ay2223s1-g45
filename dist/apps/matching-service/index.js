import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import respond from './controller/controller';
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
    respond(io, socket);
});
httpServer.listen(8001);
