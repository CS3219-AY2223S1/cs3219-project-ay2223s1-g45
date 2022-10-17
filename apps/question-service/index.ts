import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import questionsRoute from './routes/questionsRoute';
import 'dotenv/config';

const port = 8004;
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', questionsRoute);
app.get('/', (req: Request, res: Response) => {
  res.send('Hello world');
});
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Running on port ${port}`);
});

const mongoDB = process.env.ENV === 'PROD' ? process.env.DB_CLOUD_URI : process.env.DB_LOCAL_URI;
mongoose.connect(mongoDB as string, { useNewUrlParser: true, useUnifiedTopology: true } as any);
const db = mongoose.connection;
// Bind connection to error event to get notification of connection errors
// eslint-disable-next-line no-console
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
