var express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json({ type: 'application/json'});
var routes = express.Router();

var auth = require('./auth');
var index = require('./index');
var login = require('./login');
var game = require('./game');


routes.use(function(req, res, next) {
    // log each request to the console
    console.log(req.method, req.url);
    next();
});
routes.get('/', index);
routes.get('/login', login.get);
routes.post('/login', jsonParser, login.post);
routes.get('/game', auth.check, game.get);

module.exports = routes;
