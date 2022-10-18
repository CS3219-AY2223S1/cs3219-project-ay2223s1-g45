import mongoose from 'mongoose';
import UserModel from './user-model';
import 'dotenv/config';
import SessionModel from './session-model';

const mongoDB =
  // eslint-disable-next-line no-nested-ternary
  process.env.ENV === 'PROD'
    ? process.env.DB_CLOUD_URI
    : process.env.ENV === 'DEV'
    ? process.env.DB_LOCAL_URI
    : 'mongodb://mongo:27017/g45';

mongoose.connect(mongoDB as string, { useNewUrlParser: true, useUnifiedTopology: true } as any);

const db = mongoose.connection;
// eslint-disable-next-line no-console
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

export async function createUser(params: any) {
  return new UserModel(params);
}

export async function createSession(params: any) {
  return new SessionModel(params);
}
