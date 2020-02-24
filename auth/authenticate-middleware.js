const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../api/config/secrets.js');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      if (err) {
        // the token is not valid
        res.status(401).json({ unauthorized: "unAuthorized access denied. contact sysAdmin for further details" })
      } else {
        // req.user = { house: decodedToken.house };

        next();
      }
    })
  } else {
    res.status(403).json({ Forbidden: 'Access Forbidden: You shall not pass!' })
  }
};
