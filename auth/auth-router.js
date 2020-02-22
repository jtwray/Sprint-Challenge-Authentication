const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = require('express').Router();
const jwtSecret = require('../config/secrets.js');

const Users= require ('../users/users-model.js')

router.post('/register', (req, res) => {
  // implement registration
  let user = req.body;
  const hash 
});

router.post('/login', (req, res) => {
  // implement login
});

module.exports = router;
