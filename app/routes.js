var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var routes = express.Router();
routes.use(session({
  secret: 'bardzo tajne i dkugie haslo',
  // resave: false,
  // saveUninitialized: true,
  cookie: {
    path    : '/',
    // secure: true
  }
}));
routes.use(bodyParser.json()); // for parsing application/json
routes.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

var auth = require('./auth');
var index = require('./index');
var login = require('./login');
var game = require('./game');
var register = require('./register');


routes.use(function(req, res, next) {
    // log each request to the console
    console.log(req.method, req.url);
    next();
});
routes.get('/', index);
routes.get('/login', login.get);
routes.post('/login', login.post);
routes.get('/register', register.get);
routes.post('/register', register.post);
routes.get('/game', auth.check, game.get);
routes.get('/logout', function (req, res) {
  delete req.session.user_id;
  res.redirect('/login');
});

module.exports = routes;
