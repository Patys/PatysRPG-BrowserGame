var express = require('express');
var routes = express.Router();

var index = require('./index');
var login = require('./login');

routes.get('/', index);
routes.get('/login', login.get);
routes.post('/login', login.post);

module.exports = routes;
