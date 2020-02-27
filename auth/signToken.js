
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../api/config/secrets.js');

module.exports = signToken;

// check useremail includes string "admin" if true set user property admin to true
function signToken(user) {
  const payload = {
    userid: user.id, username: user.username, admin: user.email.indexOf(/[.]admin[.]/) ? true : false
  };
  const options = { expiresIn: '1d' };
  const signTokened = jwt.sign(payload, jwtSecret, options);
  return signTokened;

}
