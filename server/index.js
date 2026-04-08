require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRouter = require('./authRouter');

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

const app = express();

app.use(
  cors({
    origin: 'http://localhost:5173',
  }),
);

app.use(express.json());
app.use('/auth', authRouter);

const start = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    app.listen(PORT, () => console.log(`Cервер работает на порту ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
