#!/usr/bin/env node
require('dotenv').config({ path: __dirname + '/.env' })

/**
 * Module dependencies.
 */
var debug = require('debug')('express-api:server');
var http = require('http');
var mongoose = require('mongoose')

/**
 * Connect MongoDB
 */
mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('DB connected')
});

var express = require('express');
var path = require('path');
var logger = require('morgan');
var cors = require('cors')
var app = express();

app.use(cors())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Get port from environment and store in Express.
 */
var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */
var server = http.createServer(app);

// Chargement de socket.io
var io = require('socket.io').listen(server);

// Quand un client se connecte, on le note dans la console
/*
io.sockets.on('connection', function (socket) {
    console.log('Un client est connecté !');
    socket.on('email', function (email) {
        socket.email = email;
    });

    socket.on('message', function (message) {
        console.log(socket.email + ' me parle ! Il me dit : ' + message);
    });
});
*/

app.use('/', require('./routes/index.route'));
app.use('/users', require('./routes/user.route'));
app.use('/tables', require('./routes/table.route')(io));
app.use('/foods', require('./routes/food.route')(io));
app.use('/preparations', require('./routes/preparation.route')(io));
app.use('/auth', require('./routes/auth.route'));

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
    console.log('Server is running ...')
}