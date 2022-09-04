import express from 'express';
import cors from 'cors';
import { PathParams } from 'express-serve-static-core';
import createUser from './controller/user-controller';

const app = express();
app.use(express.urlencoded({ extended: true }) as unknown as PathParams);
app.use(express.json() as unknown as PathParams);
app.use(cors() as unknown as PathParams); // config cors so that front-end can use
app.options('*', cors() as any);

const router = express.Router();

// Controller will contain all the User-defined Routes
router.get('/', (_, res) => res.send('Hello World from user-service'));
router.post('/', createUser);

app.use('/api/user', router).all(((_: any, res: any) => {
  res.setHeader('content-type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
}) as unknown as PathParams);

// eslint-disable-next-line no-console
app.listen(8000, () => console.log('user-service listening on port 8000'));
