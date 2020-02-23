const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = require('express').Router();
const jwtSecret = require('../api/config/secrets.js');

const Users = require('../api/users/users-model.js');

router.post('/register', (req, res) => {
  // implement registration

  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 7);
  user.password = hash;

  Users.add(user).then(saved => { res.status(201).json({saved:`id:${saved.id} , username:${saved.username} , token:${saved.password} `}); })
    .catch(error => {
      res.status(500).json({error:`This user already exists`});
    });
});


router.post('/login', (req, res) => {
  let { username, password } = req.body;// implement login
  Users.findBy({ username }).first().then(user => {
    if (user & bcrypt.compareSync(password, user.password)) {
      const token = signToken(user);

      res.status(200).json({ token });
    } else {
      res.status(401).json({ message: 'Invalid Credentials' });
    }
  }).catch(error => { res.status(500).json(error); console.error(error); });
});

function signToken(user) {
  const payload = { userid: user.id };
  const options = { expiresIn: '1d' };
  return jwt.sign(payload, jwtSecret, options);
}

module.exports = router;
