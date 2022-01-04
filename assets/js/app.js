var express = require('express');
var usersRouter = require('./routes/users');

app.use('/users', usersRouter);