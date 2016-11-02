var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var routes = express.Router();

routes.use(bodyParser.json()); // for parsing application/json
routes.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

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
routes.post('/login', login.post);
routes.get('/game', auth.check, game.get);

module.exports = routes;
