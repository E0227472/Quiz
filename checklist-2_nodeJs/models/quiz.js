const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

// create an option schema to pass as object reference in Movie class
const optionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 20,
  },
});

// create a question schema to pass as object reference in Movie class
const questionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100,
  },
  options: [optionSchema],
});

// quiz object with question and option object embedded
const Quiz = mongoose.model(
  'Quiz',
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
    },
    questions: [questionSchema],
  })
);

// validate quiz input from front-end => comparing quiz object with schema
function ValidateQuiz(quiz) {
  const schema = {
    name: Joi.string()
      .min(5)
      .max(50)
      .required(),

    questions: Joi.array().items(
      Joi.object({
        // Object schema
        name: Joi.string()
          .min(5)
          .max(50)
          .required(),
        options: Joi.array().items(
          Joi.object({
            name: Joi.string()
              .min(5)
              .max(50)
              .required(),
          })
        ),
      })
    ),
  };
  return Joi.validate(quiz, schema);
}
// // add to the counter value
// async function AddCounter() {
//   const count = await Quiz.find().countDocuments();
//   return count;
// }

// create new quiz object
async function CreateQuiz(quiz) {
  const quz = new Quiz(quiz);
  const result = await quz.save();
  return result;
}

// create new question under quiz object
async function UpdateQuiz(name, quiz) {
  const quz = await Quiz.findOne({ name });
  quz.name = quiz.name;
  quz.questions = quiz.questions;
  const result = quz.save();
  return result;
}

module.exports = {
  ValidateQuiz,
  CreateQuiz,
  UpdateQuiz,
  Quiz,
};
