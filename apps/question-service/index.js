const express = require('express');
const questionsRoute = require('./routes/questionsRoute');
require('dotenv').config();

const port = 8004;
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', questionsRoute);
app.get('/', (req, res) => {
  res.send('Hello world');
});
app.listen(port, () => {
  console.log(`Running on port ${port}`);
});

const mongoose = require('mongoose');
const mongoDB = process.env.ENV === 'PROD' ? process.env.DB_CLOUD_URI : process.env.DB_LOCAL_URI;
mongoose.connect(mongoDB, { useNewUrlParser: true });
const db = mongoose.connection;
// Bind connection to error event to get notification of connection errors
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
