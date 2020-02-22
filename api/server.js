const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');

const authenticate = require('../auth/authenticate-middleware.js');
const checkFor= require('../auth/checkfor.js');
const authRouter = require('../auth/auth-router.js');
const jokesRouter = require('../jokes/jokes-router.js');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(morgan('dev'));
server.use(cors());

server.use('/api/auth',checkFor('username'),checkFor('password'), authRouter);
server.use('/api/jokes', authenticate, jokesRouter);

module.exports = server;
