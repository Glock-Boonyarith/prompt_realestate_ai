require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const sheetRouter = require('./routes/sheet');
const selectionRouter = require('./routes/selection');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/sheet', sheetRouter);         // GET /api/sheet -> list rows
app.use('/api/selection', selectionRouter); // POST /api/selection -> save selection

const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/sheetdb';

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Mongo connected');
    app.listen(PORT, () => console.log(`Backend listening on ${PORT}`));
  })
  .catch(err => {
    console.error('Mongo connect error', err);
    process.exit(1);
  });
