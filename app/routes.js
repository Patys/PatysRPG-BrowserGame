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
var error = require('./error');


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

routes.get('/character', auth.check, game.character);
routes.get('/missions', auth.check, game.missions);
routes.post('/mission/start', auth.check, game.startMission);
routes.get('/mission/end', auth.check, game.endMission);
routes.get('/shop', auth.check, game.shop);
routes.get('/arena', auth.check, game.arena);
routes.get('/ranking', auth.check, game.ranking);
routes.get('/messages', auth.check, game.messages);
routes.get('/group', auth.check, game.group);
routes.get('/error', error.get);
routes.post('/error', error.post);

routes.get('/thanks', function(req,res){res.render('thanks');});
routes.get('/ups', function(req,res){res.render('ups');});

routes.get('/logout', function (req, res) {
  delete req.session.user_id;
  res.redirect('/login');
});

module.exports = routes;
