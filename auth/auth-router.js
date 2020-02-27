const bcrypt = require('bcryptjs');
const router = require('express').Router();
const Users = require('../api/users/users-model.js');
const uniqueUser = require('./uniqueUser-middleware.js');
const signToken = require('./signToken');

router.post('/register', uniqueUser, (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 7);

  user.password = hash;

  Users.add(user)
    .then(saved => {
      const token = signToken(saved);
      res.status(201).json({ 'userId': `${saved.id}`, 'username': `${saved.username}`, 'token': `${token} ` });
    })
    .catch(error => {
      res.status(500).json({ message: 'There was an error while trying to add the user to the database.', error: `---${error}---${console.error(error)}` });
    })
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;// implement login

  Users
    .findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = signToken(user);

        res.status(200).json({ userId: `${user.id}`, username: `${user.username}`, token: `${token} ` });
      } else {
        res.status(401).json({ message: `|| ---Invalid Credentials--- ||` });
      }
    }).catch(error => { res.status(500).json(error); console.error(error); });
});

module.exports = router;
