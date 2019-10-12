const mongoose = require('mongoose');
const _ = require('lodash');
const express = require('express');

const router = express.Router();
const user = require('../models/user');

// post a user to database
router.post('/', async (req, res) => {
  const { ValidateUser, CreateUser, User } = user;
  // check if there are errors in the user object creation
  const { error } = ValidateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  // check if the user exists in the database
  const _user = await User.findOne({ email: req.body.email });

  if (_user) return res.status(400).send('User already registered');

  const result = CreateUser(req.body);

  result
    .then(output => {
      // lodash pick method only selects the properties as shown
      // send the token to the header of the response object, send the rest normally
      const token = output.generateToken();

      // header has property name 'x-auth-token'
      res
        .header('x-auth-token', token)
        .send(_.pick(output, ['_id', 'name', 'email']));
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
