const Joi = require('@hapi/joi');
const mongoose = require('mongoose');
const PasswordComplexity = require('joi-password-complexity');
const bcrypt = require('bcrypt');
// User object for sign-up

// create an userSchema to pass as object reference in User class
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1025,
  },
});

// User object - with email
const User = mongoose.model('User', userSchema);

// create new user object
async function CreateUser(user) {
  const _user = new User(user);
  // salt is the extra hashing capability that is added to the hashed password
  const salt = await bcrypt.genSalt(10);
  // hashing the password
  _user.password = await bcrypt.hash(_user.password, salt);

  const result = await _user.save();
  return result;
}

// validate User creation
function ValidateUser(user) {
  const complexityOptions = {
    min: 5,
    max: 250,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 1,
    requirementCount: 2,
  };
  const schema = {
    name: Joi.string()
      .min(5)
      .max(50)
      .required(),
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: new PasswordComplexity(complexityOptions).required(),
  };
  return Joi.validate(user, schema);
}

module.exports = {
  User,
  ValidateUser,
  CreateUser,
};
