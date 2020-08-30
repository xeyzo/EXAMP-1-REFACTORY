var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const indexRouter = require('./src/routes/index');
const usersRouter = require('./src/routes/v1/users');
const productInRouter = require('./src/routes/v1/product-in');
const productRouter = require('./src/routes/v1/products')
const productOutRouter = require('./src/routes/v1/product-out')
const authRouter = require('./src/routes/v1/auth')
const authToken = require('./src/middleware/auth-token')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/v1/users', authToken, usersRouter);
app.use('/api/v1/products', authToken, productRouter)
app.use('/api/v1/out', authToken, productOutRouter)
app.use('/api/v1/auth', authRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
