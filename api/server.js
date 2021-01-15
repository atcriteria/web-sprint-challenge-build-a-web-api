const express = require('express');
const server = express();
const actionRouter = require('./actions/actions-router');
const projectRouter = require('./projects/projects-router');

// Complete your server here!
// Do NOT `server.listen()` inside this file!

server.use(express.json());
server.use('/api/actions', actionRouter);
server.use('/api/projects', projectRouter);

server.get('/', (req, res) => {
    res.status(200).json({
        api: "up",
        env: process.env.NODE_ENV
    });
});

module.exports = server;
