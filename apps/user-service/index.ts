import express from 'express';
import cors from 'cors';
import cookieSession from 'cookie-session';
import { PathParams } from 'express-serve-static-core';
import authJwt from './middlewares/auth-jwt';
import {
  createUser,
  login,
  logout,
  userContent,
  deleteUser,
  changePassword
} from './controller/user-controller';
import verifySignUp from './middlewares/verify-signup';

const app = express();
app.use(express.urlencoded({ extended: true }) as unknown as PathParams);
app.use(express.json() as unknown as PathParams);
app.use(
  cors({
    origin: ['http://localhost:3000', String(process.env.FRONTEND_URL)],
    credentials: true
  })
);
app.use(
  cookieSession({
    name: 'session',
    secret: 'COOKIE_SECRET', // TODO: should use as secret environment variable
    httpOnly: true
  })
);

const router = express.Router();

// Controller will contain all the User-defined Routes
router.get('/', (_, res) => res.send('Hello World from user-service'));
router.post('/', [verifySignUp.checkDuplicateUsername], createUser);
router.delete('/', [authJwt.verifyToken], deleteUser);
router.post('/login', login);
router.post('/logout', logout);
router.patch('/change-password', [authJwt.verifyToken], changePassword);
router.get('/user-content', [authJwt.verifyToken], userContent);

app.use('/api/user', router).all(((_: any, res: any) => {
  res.setHeader('content-type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
}) as unknown as PathParams);

// eslint-disable-next-line no-console
app.listen(8000, () => console.log('user-service listening on port 8000'));
