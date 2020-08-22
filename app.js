var express = require('express');
var path = require('path');
var logger = require('morgan');
var cors = require('cors')


var indexRouter = require('./routes/index.route');
var userRouter = require('./routes/user.route');
var tableRouter = require('./routes/table.route');
var foodRouter = require('./routes/food.route');
var authRouter = require('./routes/auth.route');

var app = express();

app.use(cors())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', userRouter);
app.use('/tables', tableRouter);
app.use('/foods', foodRouter);
app.use('/auth', authRouter);

module.exports = app;
