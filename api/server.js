const express = require('express');
const server = express();

const authenticate = require('../auth/authenticate-middleware.js');
const configureMiddleware = require('./config/configure-middleware');
const checkFor = require('../auth/checkfor.js');

const authRouter = require('../auth/auth-router.js');
const jokesRouter = require('../jokes/jokes-router.js');

configureMiddleware(server);

server.get('/', (req, res) => {
    res.status(200).json({ api: 'uppp' });
});
server.use('/api/auth', checkFor('username'), checkFor('password'), authRouter);
server.use('/api/jokes', authenticate, jokesRouter);

module.exports = server;


