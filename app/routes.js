var express = require('express');
var routes = express.Router();

var auth = require('./auth');
var index = require('./index');
var login = require('./login');
var game = require('./game');

routes.get('/', index);
routes.get('/login', login.get);
routes.post('/login', login.post);
routes.get('/game', auth.check, game.get);

module.exports = routes;
