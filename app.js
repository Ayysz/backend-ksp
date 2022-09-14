'use strict'

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const configure = require('./helper/configure');
const config = require('./config/config');
const passport = require('passport');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser(config.jwt.cookie));
app.use(passport.initialize()); //inisialasi paspport js untuk auth
configure(app);

// load passport startegy
require('./helper/passport');

// load routes 
const routes = require('./routes');
app.use('/api/v1', routes);

// Error handling
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal server error';
    res.status(err.statusCode)
        .json({
            status: 'Error',
            message: err.message
    });
});

// create https server (on Pending cause difficult) so instead https i use http
const http = require('http');

const server = http.createServer(app);

server.listen(process.env.PORT);
server.on('error', err=>console.log(`Error on: ${err.message}`)); // if server listen error
server.on('listening', onListening); // if server listen didn't error

function onListening() {
    const addr = server.address();
    console.log(`Listening on http://localhost:${addr.port}`);
};

module.exports = server;