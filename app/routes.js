var express = require('express');
var routes = express.Router();

var auth = require('./auth');
var index = require('./index');
var login = require('./login');
var game = require('./game');

var checkAuth = function (req, res, next) {
  if (!req.session.user_id) {
    res.send('You are not authorized to viewtest this page');
  } else {
    // Moze wywalac, wymusza rerender
    //res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    next();
  }
}


routes.get('/', index);
routes.get('/login', login.get);
routes.post('/login', login.post);
routes.get('/game', checkAuth, game.get);

module.exports = routes;
