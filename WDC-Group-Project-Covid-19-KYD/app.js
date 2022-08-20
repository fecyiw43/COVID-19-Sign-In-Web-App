var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session=require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
// var healthRouter = require('./routes/health');

/* Mysql setup */
var mysql = require('mysql');
var dbConnectionPool = mysql.createPool({
    host: 'localhost',
    database: 'KYD_DB'
});

var app = express();

/* mySQL middleware things */
app.use(function(req, res, next) {
    req.pool = dbConnectionPool;
    next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
    secret: 'a string of your choice',
    resave: false,
    saveUninitialized: true,

    cookie: { secure: false,id:'' }
}));


/* GET home page. */
app.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname+'/public/login.html'));
    // res.render();
});


app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
// app.use('/healthSignUp', healthRouter);

module.exports = app;