const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const PasswordComplexity = require('joi-password-complexity');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const express = require('express');

const router = express.Router();
const user = require('../models/user');

// validate user entry details
function ValidateUser(req) {
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
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: new PasswordComplexity(complexityOptions).required(),
  };
  return Joi.validate(req, schema);
}

// authenticate user details
router.post('/', async (req, res) => {
  const { User } = user;
  // check if there are errors in the user entry details
  const { error } = ValidateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // validate the email address only
  const _user = await User.findOne({ email: req.body.email });
  if (!_user) return res.status(400).send('Invalid email or password');

  // validate the password - compare the input with database
  // compare method adds the salt to the password in the user entry
  const dbPassword = await bcrypt.compare(req.body.password, _user.password);
  if (!dbPassword) return res.status(400).send('Invalid email or password');

  // generate a jwt based on the user id stored in the database
  // token used in the front- end to access certain pages
  // private key required to modify the jwt
  const token = _user.generateToken();
  res.send(token);
});

// validate User creation
module.exports = router;
