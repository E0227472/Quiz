const mongoose = require('mongoose');
const express = require('express');
const quiz = require('./routes/quizRoute');

const app = express();

mongoose
  .connect('mongodb://localhost/checklist')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use('/api/quiz', quiz);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
