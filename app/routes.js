var routes = require('express').Router();

var index = require('./index');

routes.get('/', index);

module.exports = routes;
