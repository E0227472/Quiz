const mongoose = require('mongoose');
const express = require('express');

const router = express.Router();
const quiz = require('../models/quiz');

// get all the quizzes from the database
router.get('/', async (req, res) => {
  const { Quiz } = quiz; // get the movie class
  const quizzes = await Quiz.find()
    .sort('name')
    .select({ name: 1 });
  res.send(quizzes);
  console.log(quizzes);
});

// get the quiz by name
router.get('/:name', async (req, res) => {
  const { Quiz } = quiz;
  const quz = await Quiz.findOne({ name: req.params.name }).select({
    questions: 1,
  });

  if (!quz) return res.status(404).send('No such quiz exists');

  res.send(quz);
});

// post a quiz to database
router.post('/', async (req, res) => {
  const { ValidateQuiz, CreateQuiz } = quiz;
  const { error } = ValidateQuiz(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const result = CreateQuiz(req.body);
  result
    .then(output => {
      console.log(output);
      res.send(output);
    })
    .catch(err => {
      console.log(err);
    });
});

// update the quiz based on the name
router.put('/:name', async (req, res) => {
  const { ValidateQuiz, UpdateQuiz } = quiz;
  const { error } = ValidateQuiz(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const result = UpdateQuiz(req.params.name, req.body);

  result
    .then(output => {
      console.log(output);
      res.send(output);
    })
    .catch(err => {
      console.log(err);
      res.status(404).send('Quiz does not exist');
    });
});

// delete the quiz based on the name
// delete the movie object
router.delete('/:name', async (req, res) => {
  const { Quiz } = quiz;
  const quz = await Quiz.findOneAndRemove({ name: req.params.name });

  if (!quz) return res.status(404).send('The quiz could not be found');

  res.send(quz);
});

module.exports = router;
