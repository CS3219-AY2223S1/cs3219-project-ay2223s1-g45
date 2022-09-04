import express from 'express';
import { PathParams } from 'express-serve-static-core';
import cors from 'cors';
import { createServer } from 'http';

const app = express();
app.use(express.urlencoded({ extended: true }) as unknown as PathParams);
app.use(express.json() as unknown as PathParams);
app.use(cors() as unknown as PathParams); // config cors so that front-end can use
app.options('*', cors() as any);

app.get('/', (req: any, res: any) => {
  res.send('Hello World from matching-service');
});

const httpServer = createServer(app);

httpServer.listen(8001);
