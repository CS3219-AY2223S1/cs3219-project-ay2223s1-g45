import mongoose from 'mongoose';
import UserModel from './user-model';
import 'dotenv/config';

const mongoDB = process.env.ENV === 'PROD' ? process.env.DB_CLOUD_URI : process.env.DB_LOCAL_URI;

mongoose.connect(mongoDB as string, { useNewUrlParser: true, useUnifiedTopology: true } as any);

const db = mongoose.connection;
// eslint-disable-next-line no-console
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

export default function createUser(params: any) {
  return new UserModel(params);
}
