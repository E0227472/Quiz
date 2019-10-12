const mongoose = require('mongoose');
const config = require('config');
const express = require('express');
const Cors = require('cors');
const quiz = require('./routes/quizRoute');
const users = require('./routes/userRoute');
const auth = require('./routes/auth');

const app = express();
app.use(Cors());
mongoose
  .connect('mongodb://localhost/checklist')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

if (!config.get('jwtPrivateKey')) {
  console.log('incorrect configuration settings');
  process.exit(1);
}

app.use(express.json());
app.use('/api/quiz', quiz);
app.use('/api/users', users);
app.use('/api/auth', auth);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
