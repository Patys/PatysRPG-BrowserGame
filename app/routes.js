var express = require('express');
var routes = express.Router();

var index = require('./index');

routes.get('/', index);

module.exports = routes;
